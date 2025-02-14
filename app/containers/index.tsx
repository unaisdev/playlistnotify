import {BottomSheetHomeProvider} from '@app/containers/BottomSheetHomeContext';
import {ProfileProvider} from '@app/containers/ProfileContext';
import {ThemeProvider} from '@app/containers/ThemeContext';
import {UserProvider} from '@app/containers/UserContext';
import {PropsWithChildren} from 'react';

const GlobalContext = ({children}: PropsWithChildren) => {
  return (
    <ThemeProvider>
      <UserProvider>
        <ProfileProvider>
          <BottomSheetHomeProvider>{children}</BottomSheetHomeProvider>
        </ProfileProvider>
      </UserProvider>
    </ThemeProvider>
  );
};

export default GlobalContext;
