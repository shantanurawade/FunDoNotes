import { createDrawerNavigator } from "@react-navigation/drawer";
import { Home } from "./Components/DrawerOptions/Home";
import { Option } from "./Components/DrawerOptions/Option"
import Reminders from "./Components/DrawerOptions/Reminders";
import Archive from "./Components/DrawerOptions/Archive";
import Bin from "./Components/DrawerOptions/Bin";

const Drawer = createDrawerNavigator();

function MainScreen(props: any) {


    return (

        <Drawer.Navigator initialRouteName="Home">

            <Drawer.Screen name="Home" component={Home} options={{headerShown: false}} initialParams={{ props } }></Drawer.Screen>
            <Drawer.Screen name="Options" component={Option}></Drawer.Screen>
            <Drawer.Screen name="Reminders" component={Reminders}></Drawer.Screen>
            <Drawer.Screen name="Archive" component={Archive}></Drawer.Screen>
            <Drawer.Screen name="Bin" component={Bin}></Drawer.Screen>

        </Drawer.Navigator>

    )
}


export default MainScreen;
