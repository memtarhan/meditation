// // import { Stack } from "expo-router";

// // export default function Layout() {
// //     return (
// //         <Stack>
// //             <Stack.Screen name="index" options={{ headerShown: false }} />
// //             <Stack.Screen name="meditation-details/MeditationDetails" options={{ headerShown: true }} />
// //         </Stack>
// //     );
// // }
// import { Stack } from "expo-router";

// export default function Layout() {
//     return (
//         <Stack>
//             <Stack.Screen name="index" options={{ title: "Home" }} />
//             <Stack.Screen name="settings" options={{ title: "Settings" }} />
//             <Stack.Screen name="favorites" options={{ title: "My Favorites" }} />
//         </Stack>
//     );
// }

import { Stack } from "expo-router";
import { ThemeProvider } from "../context/ThemeContext";

export default function RootLayout() {
    return (
        <ThemeProvider>
            <Stack screenOptions={{ headerShown: false }} />
        </ThemeProvider>
    );
}
