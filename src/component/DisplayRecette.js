import React, {useEffect} from "react";
import {Image, View, Text, Keyboard, TouchableOpacity} from "react-native";
import {API_KEY} from "../api/config";

const DisplayRecette = ({id, title, image, onClick }) => {

    const [time, setTime] = React.useState('');
    const [likes, setLikes] = React.useState('');
    const [instructions, setInstructions] = React.useState('');
    const [ingredients, setIngredients] = React.useState('');

    useEffect(() => {
        getDetailsRecette(id);
    });

    const getDetailsRecette = async (id) => {
        getInstructions(id);
        getIngredients(id);
        getInfo(id);
    }

    const getInfo = async (id) => {
        try {
            const response = await fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`);
            const data = await response.json();
            setTime(data.readyInMinutes);
            setLikes(data.aggregateLikes);
        }
        catch (error) {
            console.log(error)
        }
    }

    const getIngredients = async (id) => {
        try{
            const response = await fetch(`https://api.spoonacular.com/recipes/${id}/information&apiKey=${API_KEY}`);
            const data = await response.json();
            setIngredients(data.extendedIngredients);
        }catch (error) {
            console.log(error)
        }
    }

    const getInstructions = async (id) => {
        try {
            const response = await fetch(`https://api.spoonacular.com/recipes/${id}/analyzedInstructions&apiKey=${API_KEY}`);
            const data = await response.json();
            setInstructions(data);
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <TouchableOpacity onPress={onClick}>
            <View>
                <Text>{title}</Text>
                <Image source={{uri: image}} style={{width: 100, height: 100}}/>
                <Text>Time: {time}</Text>
                <Text>Likes: {likes}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default DisplayRecette;