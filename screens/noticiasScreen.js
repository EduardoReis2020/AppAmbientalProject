import React, { useEffect, useState } from 'react'
import { View,Text, Button, StyleSheet, TouchableOpacity, FlatList,Image} from 'react-native'

import Header from './componentes_noticias/header'
import Card from './componentes_noticias/card'
import DataInfo from '../assets/info/info.json'

import { ScrollView } from 'react-native-virtualized-view'
import SplashScreen from "react-native-splash-screen"

const NoticiasScreen= ({navigation}) =>{
    //navigation.setOptions({ tabBarStyle: {display: 'none'}})
    useEffect(()=>{
        setTimeout(()=>{
            SplashScreen.hide()
        },500)
    })
    const [Data, setData] = useState([]);
    const [Select,setSelect] = useState(0);
    const [Category,setCategory] = React.useState([
        {
            id: 4,
            name: 'Principais Noticias',
            category:'general',
        },
        {
            id: 5,
            name: 'Ensino',
            category: 'ensino',
        },

        {
            id: 2,
            name: 'Turismo',
            category: 'turismo',
        },
        {
            id: 1,
            name: 'Curiosidades',
            category:'curiosidade',
        },

    ]);
    
    
    let cont = 0;
    useEffect(() => {
        const getData = async () => {
          try {
            const json = require('../assets/info/info.json');
            if (Category[Select].category === 'general'){
                setData(json.articles)
            }else{
                const filteredArticles = json.articles.filter(
                (article) => article.category === Category[Select].category
                );
                setData(filteredArticles);
            }
          } catch (error) {
            console.error('Erro ao carregar o JSON:', error);
          }
        };
    
        getData(); // Chama a função fetchData diretamente no useEffect
    
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [Select]);


      const handleScroll = (event) => {
        const offsetY = event.nativeEvent.contentOffset.y;
        if (offsetY > 0) {
          navigation.setOptions({
            tabBarStyle: {display: 'none'}, // Oculta o navigator quando a tela é rolada para baixo
          });
        } else {
          navigation.setOptions({
            tabBarStyle: {
                position:'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                elevation: 0,
                backgroundColor: '#ffff',
                borderRadius: 15,
                height:70,
                ... style.shadow
            } // Mostra o navigator quando a tela é rolada para cima
          });
        }
      };
    
      useEffect(() => {
        // Sua lógica de carregamento de dados aqui
      }, [Select]);
    
    return (
        <ScrollView onScroll={handleScroll} className="bg-backgroundprimary">
        <View className="flex-1 "> 
            
            {/* logo inicio */}
            <View style ={{flexDirection: 'row'}}>
                <View style={{ alignItems: 'center', paddingVertical: 38,paddingLeft:25 }}>
                    <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#3165b0' }}>
                        Catálogo Ambiental
                    </Text>    
                    <Text style={{ fontSize: 16, color: '#c76828', fontStyle: 'italic'  }}>Conheça mais sobre a caatinga</Text>
                </View>

                <View style={{ paddingLeft: 45,paddingVertical:28 }}>
                    <Image
                    source={require('../assets/logo/logo.png')}
                    style={{ width: 80, height: 80, borderRadius: 25 }}
                    />
                </View>
            </View>

            <View className="flex-row ml-5"
            style={{ zIndex: 10 }}>
                <Image source={require('../assets/icons/Trilha-icon-select.png')} 
                className= { "h-8 w-8 absolute mt-0.25" }
                style = {{backgroundColor:'#E8E7E4',
                          borderRadius:50 ,
                          }}
                resizeMethod='resize'></Image>
                <Text className="text-black ml-9">Indicação de trilha</Text>
            </View>
            
            <TouchableOpacity className="flex-1 overflow-hidden items-center justify-center" style={{ zIndex: 0 }}
            onPress={() => {
                // Adicione a lógica do seu botão aqui
                navigation.navigate('Home');
                console.log('Botão pressionado!');
              }}>
                <Image source={require('../assets/logo/caatinga.jpg')} 
                className= { "h-40 w-full overflow-hidden" }
                resizeMethod='resize'></Image>
                 <View style={style.overlay} />

                 <Text className="absolute text-4xl text-white top-14">Nome da Trilha 1 </Text>
                 <Text className="absolute text-base text-white bottom-9">Info 9999   Info 9999   Info 9999</Text>
                
            </TouchableOpacity>
        

            <View>

            {/* Categoria */}
            {/* <View className="px-4 py-2">
                <FlatList data = {Category} horizontal showsHorizontalScrollIndicator={false} renderItem={({item,index}) =>{
                    return(
                        <TouchableOpacity className={ index == Select ? 'px-4 py-1 rounded-md bg-redprimary mr-3' : 'px-4 py-1 rounded-md mr-3 bg-gray-200'} 
                        onPress={() =>{ 
                            setSelect(index);
                            //getData();
                            }}>
                            <Text className={index == Select ? "text-white" : "text-black"}>{item.name}</Text>
                        </TouchableOpacity>
                    )
                }}></FlatList>
            </View>   */}

                <FlatList data={Data} renderItem={({item,index}) =>{
                    return(
                        <Card navigation={navigation} item={item} cont={index} />  
                    )
                }} />
            </View>

        </View>
        </ScrollView>
    )
}

export default NoticiasScreen

const style = StyleSheet.create({
    shadow:{
        shadowColor: '#7F5DF0',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Cor preta semi-transparente
      },
})
