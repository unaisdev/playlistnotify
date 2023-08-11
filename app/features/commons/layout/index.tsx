import {View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

type Props = {
  children?: React.ReactNode;
};

const Layout: React.FC<Props> = ({children}) => {
  return <SafeAreaView>{children}</SafeAreaView>;
};
