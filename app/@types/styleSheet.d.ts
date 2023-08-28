import 'react-native';

// ********************************************************************************************
/////// This function makes styles={styles.container(isDarkMode)} not giving TypeScript errors
///////
/////// const styles = StyleSheet.create({
///////     container: (isDarkMode: boolean) => ({
///////       backgroundColor: isDarkMode ? 'white' : 'black',
///////     })
///////   })
// ********************************************************************************************

declare module 'react-native' {
  namespace StyleSheet {
    type Style = ViewStyle | TextStyle | Imagestyle;
    type NamedStyles<T> = {[P in keyof T]: Style};
    /**
     * Creates a StyleSheet style reference from the given object.
     * */
    export function create<T, S extends NamedStyles<S> | NamedStyles<any>>(
      styles: T | NamedStyles<S>,
    ): T & S;
  }
}
