import { View, Text, Switch } from 'react-native'
import React from 'react'
import { style } from "../../../Styles/style";
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../Redux/store'
import { toggleTheme } from '../../../Redux/action'

const settings = () => {

    const isDarkTheme = useSelector((store: RootState) => store.themeState.isDarkTheme);
    const dispatch = useDispatch();
    return (
        <View style={{ backgroundColor: isDarkTheme ? 'black' : 'white', flex:1 }}>
            <View style={{ height: 80, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: isDarkTheme ? 'grey' : 'white' }}>
                <Text style={[style.text, { color: 'black', alignContent: 'center' }]}>Dark Mode</Text>
                <Switch
                    value={isDarkTheme}
                    onValueChange={() => {
                        dispatch(toggleTheme());
                    }} />
            </View>
        </View>
    )
}

export default settings