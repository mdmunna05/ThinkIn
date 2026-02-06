import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { initializeBackend } from './services';
import { authService } from './services';
import { useUserStore } from './store';
import { colors } from './styles/theme';

// Import screens
import { WelcomeScreen } from './screens/WelcomeScreen';
import { IdentitySetupScreen } from './screens/IdentitySetupScreen';
import { MindMappingScreen } from './screens/MindMappingScreen';
import { MindSnapshotScreen } from './screens/MindSnapshotScreen';
import { HomeScreen } from './screens/HomeScreen';

type AppState = 'loading' | 'welcome' | 'onboarding' | 'home';

export default function App() {
  const [appState, setAppState] = useState<AppState>('loading');
  const [onboardingStep, setOnboardingStep] = useState<'identity' | 'mindmap' | 'snapshot'>(
    'identity'
  );
  
  const { currentUser, setCurrentUser, setLoading } = useUserStore();

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Initialize backend (Firebase/Supabase)
        await initializeBackend();

        // Try to restore previous session
        const restoredUser = await authService.restoreSession('current-user-id');

        if (restoredUser) {
          setCurrentUser(restoredUser);
          
          if (restoredUser.onboardingCompleted) {
            setAppState('home');
          } else {
            setAppState('onboarding');
          }
        } else {
          // New user
          setAppState('welcome');
        }
      } catch (error) {
        console.error('App initialization error:', error);
        setAppState('welcome');
      } finally {
        setLoading(false);
      }
    };

    initializeApp();
  }, []);

  if (appState === 'loading') {
    return (
      <View style={{ flex: 1, backgroundColor: colors.background, justifyContent: 'center' }}>
        <ActivityIndicator size="large" color={colors.accent} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      {appState === 'welcome' && (
        <WelcomeScreen
          onStart={async () => {
            try {
              console.log('🔵 Begin Mapping pressed - creating anonymous user');
              const user = await authService.createAnonymousUser();
              console.log('✅ Anonymous user created:', user);
              setCurrentUser(user);
              console.log('✅ User state updated, changing to onboarding');
              setAppState('onboarding');
            } catch (error) {
              console.error('❌ Error creating anonymous user:', error);
            }
          }}
        />
      )}

      {appState === 'onboarding' && (
        <>
          {onboardingStep === 'identity' && (
            <IdentitySetupScreen
              onComplete={() => {
                // Save identity to user
                if (currentUser) {
                  authService.updateProfile(currentUser.id, {
                    ...currentUser,
                    // Update with form values (would be passed from screen)
                  });
                }
                setOnboardingStep('mindmap');
              }}
            />
          )}

          {onboardingStep === 'mindmap' && (
            <MindMappingScreen
              onComplete={() => {
                setOnboardingStep('snapshot');
              }}
            />
          )}

          {onboardingStep === 'snapshot' && (
            <MindSnapshotScreen
              onComplete={() => {
                console.log('✅ Onboarding complete - going to home');
                setAppState('home');
              }}
              onRestart={() => {
                console.log('🔄 Restarting survey');
                setOnboardingStep('mindmap');
              }}
            />
          )}
        </>
      )}

      {appState === 'home' && <HomeScreen />}
    </View>
  );
}
