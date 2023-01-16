import React  from "react";
import {View, Text} from "react-native";
import Search from "./Search";

const SearchScreen = (props) => {
    return (
        <View>
            <Search navigation={props.navigation}/>
        </View>
    )
}

export default SearchScreen;