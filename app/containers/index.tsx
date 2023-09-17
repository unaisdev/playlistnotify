import {BottomSheetHomeProvider} from '@app/containers/BottomSheetHomeContext';
import {BottomSheetProfileProvider} from '@app/containers/BottomSheetProfileContext';
import {ThemeProvider} from '@app/containers/ThemeContext';
import {UserProvider} from '@app/containers/UserContext';
import {PropsWithChildren} from 'react';

const GlobalContext = ({children}: PropsWithChildren) => {
  return (
    <ThemeProvider>
      <UserProvider>
        <BottomSheetProfileProvider>
          <BottomSheetHomeProvider>{children}</BottomSheetHomeProvider>
        </BottomSheetProfileProvider>
      </UserProvider>
    </ThemeProvider>
  );
};

export default GlobalContext;
