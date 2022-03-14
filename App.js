import { SafeAreaView, Pressable, Text, Image, StyleSheet, View, FlatList, TextInput, Modal} from 'react-native';
import React, { useState, useEffect } from 'react';
import { Slider } from 'react-native-range-slider-expo';
import { FontAwesome } from '@expo/vector-icons';

const App = () => {
  const [vehicleData, setVehicleData] = useState([]);
  const [vehicleNameFilter, setVehicleNameFilter] = useState("");
  const [vehicleModalFilter, setvehicleModalFilter] = useState(0);
  //--------------- Modal
  const [modalVisible, setModalVisible] = useState(false);
  
  // -----------------API call
  async function fetchURL(url) {
    const response = await fetch(url);
    const data = await response.json();  
    const Results = data.Results;
    setVehicleData(Results);
  } 
  //--------------- USE EFFECT

  useEffect(() => {
    fetchURL(`https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformake/honda?format=json`);
  }, []);
  

   // ----------------- Range Slider

   //testFilter=vehicleData.slice(0,vehicleModalFilter);

  // ----------------- Range Slider

  // --------------- Name Search
  let filtered = [];
  const nameFilter = (filterString) => {
    if (filterString && filterString.toLowerCase) {
      filterString = filterString.toLowerCase();
    }
    vehicleData.forEach((Result) => {
        const Name = `${Result.Model_Name} ${Result.Model_ID} ${Result.Make_ID}`.toLowerCase();
      if (!filterString || Name.includes(filterString)) {
        filtered.push(Result);
      }
    });
    return filtered;
  };
  const filteredByNameVehicles = nameFilter(vehicleNameFilter);
    const FilteredVehicles = [];
    filteredByNameVehicles.forEach((vehicle) => {
    FilteredVehicles.push(vehicle);
  
  });
  // --------------- Name Search

  //-------------- Single Car
  const ItemView = ({ item }) => {
    return (
      <View style={styles.itemStyle} onPress={() => getItem(item)}>
        <Image source={{ uri: 'https://www.autocar.co.uk/sites/autocar.co.uk/files/images/car-reviews/first-drives/legacy/ubg-4410_0.jpg' }} style={{ width: '100%', height: 250 }} />
        <Text style={styles.itemDetail}>
          <Text style={styles.Detailinner}>
              <Text style={styles.itemHead}>{item.Make_Name}</Text>{'\n'}
              <Text style={styles.itemModel}>{item.Model_ID}</Text> {' '}
              <Text style={styles.itemName}>{item.Model_Name}</Text> 
            </Text>
            
        </Text>
        <Pressable style={styles.buttonBook}>
                <Text style={styles.bookBox}> Book - $ 249/day </Text>
            </Pressable>
      </View>
    ); 
  };
   //-------------- Single Car
 //------------------- Return
return (
  <SafeAreaView style={styles.container}>
    <View style={styles.warper}>
      <View style={styles.searchOuter}>
        <Text style={styles.BrowseCar}>Browse Your Car</Text>
          <Pressable style={styles.buttonFilter} onPress={() => setModalVisible(true)}>
              <FontAwesome name="filter" style={styles.bookBox}> Filtter </FontAwesome>
          </Pressable>
          <View style={styles.centeredView}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setModalVisible(!modalVisible);
              }}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <View style={styles.rangeSlide}>
                    <Slider min={20} max={vehicleData.length} step={1}
                        valueOnChange={vehicleModalFilter => setvehicleModalFilter(vehicleModalFilter)} 
                        initialValue={0}
                        knobColor='skyblue'
                        valueLabelsBackgroundColor='black'
                        inRangeBarColor='lightgray'
                        outOfRangeBarColor='skyblue'
                        rangeLabelsTextColor= 'black'
                    />     
                </View>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setModalVisible(!modalVisible)}>
                    <Text style={styles.textStyle}>Hide Modal</Text>
                  </Pressable>
                </View>
              </View>
            </Modal>
            
          </View>
          <View style={styles.SearchIconOtr}>
          <FontAwesome style={styles.SearchIcon} name="search"></FontAwesome>
            <TextInput
                style={styles.textInputStyle}
                onChangeText= {(text) => setVehicleNameFilter(text)} 
                type= 'text'
                placeholder="Search by Name, Modal and Type"
            />
          </View>
    </View>
   <View style={styles.Totalcar}>
          <Text style={styles.TotalcarText}>
          <FontAwesome name="crosshairs" style={styles.TotalcarText}></FontAwesome> 
          <Text style={styles.TotalcarText}> Cars Near You </Text>{' '}
            </Text>            
          <Text style={styles.TotalcarResult}>{vehicleData.length} results</Text>
    </View>
    <FlatList style={styles.listCar}
        data={filtered}
        keyExtractor={(item, index) => index.toString()}
         renderItem={ItemView}
      />
    </View>
    </SafeAreaView>
);
}
//------------------- Return

//------------------- styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  warper: { 
    width:'100%',
  },
  BrowseCar:{
    fontSize: 20,
    fontWeight: 'bold',
    paddingTop: 10,
   },
   buttonFilter: {
     position: 'absolute',
     right:30,
     top: 8,
   },
   SearchIconOtr: {
     position: 'relative',
   },
   SearchIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
    fontSize: 18
  },
  itemStyle: {
    display: 'flex',
    flexWrap: 'nowrap',
    alignItems: 'center',
    paddingBottom: 20,
    position: 'relative',
  },
  itemDetail: {
    display: 'flex',
    width: '100%',
    paddingLeft: 10,
    paddingRight: 167,
    paddingTop: 20,
    justifyContent: 'space-between',
    position: 'relative'
  },
  Detailinner: {
    
  },
  buttonBook: {
    position: 'absolute',
    right: 10,
    top: 270, 
  },
  bookBox: {
    backgroundColor: '#333',
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
    paddingLeft: 7,
    paddingRight: 7,
    paddingTop: 8,
    paddingBottom: 8,
    lineHeight: 16
  },
  searchOuter: {
    width: '100%',
    paddingLeft: 30, 
    paddingRight: 30,
  },
  textInputStyle: {
    height: 40,
    paddingLeft: 15,
    marginBottom: 30,
    backgroundColor: '#f9f9f9',
    width: '100%',
    fontSize: 15,
    borderWidth: 1,
    borderColor: '#cbc9c9',

  },
  itemHead: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  itemModel: {
    fontSize: 15,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  itemName: {
    color: '#444',
    fontSize: 15,
  },
  rangeSlide: {
    width: '100%',
    paddingBottom:100,
    color: '#fff',
  },
  Totalcar: {
    width: '100%',
    display: 'flex',
    position: 'relative',
    paddingLeft:10,
    paddingRight:10,
    paddingBottom:10,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  TotalcarText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  TotalcarResult:{
    position: 'absolute',
    right: 10,
    top:5,
  },


  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 1,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 0,
    padding: 10,
    elevation: 2,
  },
   buttonClose: {
    backgroundColor: '#333',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
 
});
export default App;