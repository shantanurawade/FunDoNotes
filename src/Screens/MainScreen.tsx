import { createDrawerNavigator } from "@react-navigation/drawer";
import { Home } from "./Home";
import { Option } from "./Option"
import Reminders from "./Reminders";
import Archive from "./Archive";
import Bin from "./Bin";

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
