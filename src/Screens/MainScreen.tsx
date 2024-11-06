import { createDrawerNavigator } from "@react-navigation/drawer";
import { Home } from "./Components/DrawerOptions/Home";
import { Option } from "./Components/DrawerOptions/Option"
import Reminders from "./Components/DrawerOptions/Reminders";
import Archive from "./Components/DrawerOptions/Archive";
import Bin from "./Components/DrawerOptions/Bin";
import settings from "./Components/DrawerOptions/settings";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/store";


const Drawer = createDrawerNavigator();
function MainScreen(props: any) {
    const isDarkTheme = useSelector((store: RootState) => store.themeState.isDarkTheme)

    return (

        // <MyContext.Provider value={saved}>
        <Drawer.Navigator initialRouteName="Home"
            screenOptions={{
                drawerStyle: {
                    backgroundColor: isDarkTheme ? 'black' : 'white',
                    // width: 240,   
                },
                drawerLabelStyle: {
                    // fontWeight: 'bold',
                    // color: '#333',
                },
                // drawerActiveTintColor: '#e91e63',
                drawerInactiveTintColor: 'gray',
                drawerItemStyle: {
                    marginVertical: 5,
                },
            }}>

            <Drawer.Screen name="Home"
                component={Home}
                options={{ headerShown: false }}

                initialParams={{ props }}>
            </Drawer.Screen>
            <Drawer.Screen name="Options" component={Option} />
            <Drawer.Screen name="Reminders" component={Reminders} />
            <Drawer.Screen name="Archive" component={Archive} />
            <Drawer.Screen name="Bin" component={Bin} />
            <Drawer.Screen name="Settings" component={settings} options={{headerStyle:{
                backgroundColor: isDarkTheme? 'grey' : 'white'
            }}} />

        </Drawer.Navigator>

    )
}


export default MainScreen;
