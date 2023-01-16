import React  from "react";
import {View, Text, FlatList, TextInput, Pressable, Keyboard} from "react-native";
import {useEffect} from "react";
import DisplayRecette from "./DisplayRecette";
import {API_KEY} from "../api/config";


const Search = (props) => {

    const [searchText, setSearchText] = React.useState('');
    const [recettes, setRecettes] = React.useState([]);
    const [nbRecettes, setNbRecettes] = React.useState(0);
    const [currentNbRecettes, setCurrentNbRecettes] = React.useState(0);
    const [isError , setIsError] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');

    useEffect(() => {
        getMoreRecettes(searchText);
    }, [currentNbRecettes]);

    const changeText = (text) => {
        setCurrentNbRecettes(0);
        setSearchText(text);
        setRecettes([]);
    }

    const getRandomRecettes = async () => {
        try {
            const response = await fetch(`https://api.spoonacular.com/recipes/random?number=10&apiKey=${API_KEY}`);
            const data = await response.json();
            setNbRecettes(data.totalResults);
            if(data.results) {
                let newArray = [...recettes, ...data.results];
                setRecettes(newArray);
            }
            setIsError(false);
            Keyboard.dismiss();
        } catch (error) {
            console.log(error)
            setErrorMessage("Impossible de récupérer les recettes");
            setIsError(true);
        }
    }

    const getRecettes = async (query, offset) => {
        try {
            const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${query}&offset=${offset}&number=10&apiKey=${API_KEY}`);
            const data = await response.json();
            setNbRecettes(data.totalResults);
            if(data.results) {
                let newArray = [...recettes, ...data.results];
                setRecettes(newArray);
            }
            setIsError(false);
            Keyboard.dismiss();
        } catch (error) {
            console.log(error)
            setErrorMessage("Impossible de récupérer les recettes");
            setIsError(true);
        }
    };

    const getMoreRecettes = async (query) => {
        if (currentNbRecettes < nbRecettes) {
            getRecettes(query, currentNbRecettes);
        }
    };

    const navigateToRecetteDetails = (id) => {
        props.navigation.navigate('RecetteDetails', {id: id});
    };

    let content;

    if(isError) {
        content = <View>
            <Text>{errorMessage}</Text>
        </View>
    } else {
        content = <FlatList
            data={recettes}
            renderItem={({ item }) => <DisplayRecette id={item.id} title={item.title} image={item.image} onClick={() => navigateToRecetteDetails(item.id)}/> }
            keyExtractor={item => item.id}
            onEndReached={() => {setCurrentNbRecettes(currentNbRecettes + 10 );} }
            onEndReachedThreshold={ 0.5 }
        />
    }

    return (
        <View>
            <TextInput placeholder='Recette à chercher' onChangeText={(text) => {changeText(text)}}/>
            <Pressable onPress={() => {
                getRecettes(searchText, currentNbRecettes);
            }}>
                <Text >Chercher</Text>
            </Pressable>
            {content}
        </View>
    );

}

export default Search;