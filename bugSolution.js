The solution involves using both `Linking.getInitialURL` and `Linking.addEventListener` to handle deep links. `Linking.getInitialURL` handles initial launch with a deep link, while `Linking.addEventListener` handles subsequent deep links.  The added check ensures that the event listener is only added once. The `Linking.openURL` is used to simulate a deep link, making the test case repeatable.

```javascript
import * as Linking from 'expo-linking';
import React, { useEffect, useState } from 'react';

function App() {
  const [initialUrl, setInitialUrl] = useState(null);
  const [deepLink, setDeepLink] = useState(null);

  useEffect(() => {
    const handleInitialURL = async () => {
      const url = await Linking.getInitialURL();
      setInitialUrl(url);
    };

    const handleDeepLink = ({ url }) => {
      setDeepLink(url);
    };

    Linking.addEventListener('url', handleDeepLink);
    handleInitialURL();

    return () => Linking.removeEventListener('url', handleDeepLink);
  }, []);

  useEffect(() => {
      if(deepLink) {
          //Handle the deeplink
          console.log('Deep Link Received:', deepLink);
      }
  }, [deepLink]);

  return (
    <View>
      {initialUrl && <Text>Initial URL: {initialUrl}</Text>}
      {deepLink && <Text>Deep Link: {deepLink}</Text>}
    </View>
  );
}
export default App;

//Simulate a deeplink using Linking.openURL
Linking.openURL('your-app-scheme://path')
```