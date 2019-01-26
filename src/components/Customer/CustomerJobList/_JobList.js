import React, {Component} from 'react';
import {Text, TouchableOpacity, View, FlatList, Dimensions,SafeAreaView, ActivityIndicator} from 'react-native';
import EvilIcons from '@expo/vector-icons/EvilIcons'
const {width} = Dimensions.get('window')
import Moment from 'moment';
const styles = require('./CustomerJobListStyles');

export default class _JobList extends Component {

  //======================================================================
  // constructor
  //======================================================================

  constructor(props){
    super(props)
    this.state = {
      jobList : this.props.jobList,
      isOnRefresh : false,
      isLoading : this.props.isLoading || false,
    }
  }

  componentWillReceiveProps(newProps){
    this.setState({
      jobList : newProps.jobList,
      isOnRefresh:newProps.isOnRefresh,
      isLoading:newProps.isLoading || false}, 
      this.forceUpdate()
    )
  }

  //======================================================================
  // renderItem
  //======================================================================

  renderItem(item) {
    data = item.item.attributes
    var description = ""
    var subDescription = ""
    data.job_details.map((val,index)=>{
      if(val.service.type_service == "base"){
        description += val.service.name
      }else{
        subDescription += val.service.name + " x " + val.value
        subDescription += (data.job_details.length - 1 == index) ? "" : ", " 
      }
    })
    var date = Moment(data.started_at).format('l - hh:mm a')
    var location = data.property.data.attributes.p_street + ", " + data.property.data.attributes.s_street +", "+data.property.data.attributes.city
    return(
      <TouchableOpacity style={{flex:1,marginHorizontal:20,paddingVertical:20}} onPress={() => this.props.navigateToDetail("CustomerJobDetailScreen",{jobData:data}) }>
        <View style={styles.listTitleView}>
          <Text style={styles.titleText}>
            {(data.customer && data.customer.first_name) + " "+ (data.customer && data.customer.last_name)}
          </Text>
          <Text style={[styles.textFont,{color:'rgb(0,121,189)'}]}>{date}</Text>
        </View>
        <Text style={[styles.textFont]}>{description}</Text>
        <View style={styles.subtextViewStyle}>
          <View style={{flex:1}}>
            <Text style={[styles.textFont,{fontSize:12}]}>{subDescription}</Text>
          </View>
          <View style={{flex:0.25}}>
            <Text style={[styles.textFont,{color:'rgb(0,121,189)',fontSize:20}]}>{"$"+data.total.toFixed(2)}</Text>
          </View>
        </View>
        <View style={{flexDirection:'row',alignItems:'center'}}>
          <EvilIcons name={"location"} size={16} />
          <Text style={[styles.textFont,{marginLeft:5,fontSize:12}]}>{location}</Text>
        </View>
      </TouchableOpacity>
    )    
  }

  //======================================================================
  // ListEmptyComponent
  //======================================================================

  ListEmptyComponent = () =>{
    if(this.props.jobList.length == 0){
      return(
        <View style={{alignItems:'center',justifyContent:'center',marginHorizontal:20,paddingVertical:20}} >
          <Text style={styles.emptyText}>{"No hay trabajos, regrese más tarde"}</Text>
        </View>
      )
    }else{
      return null
    }
  }

  //======================================================================
  // FooterComponent
  //======================================================================

  ListFooterComponent = () =>{
    return this.state.isLoading ? <ActivityIndicator size="large" color="transparent" alignItems="center" justifyContent="center" animating={this.state.isLoading} /> : null
  }

  //======================================================================
  // ItemSeparatorComponent
  //======================================================================

  ItemSeparatorComponent = () =>{
    return(
      <View style={{height:1,width:width,backgroundColor:'gray'}} />
    )
  }

  //======================================================================
  // ListEmptyComponent
  //======================================================================

  render(){
    return(
      <SafeAreaView style={{flex:1}}>
        <FlatList
          data = {this.state.jobList}
          renderItem = {this.renderItem}
          refreshing={this.state.isOnRefresh}
          onRefresh={this.props.onRefresh}
          ItemSeparatorComponent={this.ItemSeparatorComponent}
          keyExtractor={(item,index)=>index.toString()}
          ListEmptyComponent={this.ListEmptyComponent}
          ListFooterComponent={this.ListFooterComponent}
          extraData={this.state}
          onEndReached={this.props.onEndReached}
          onEndReachedThreshold={0.1}
          initialNumToRender={10}
          onMomentumScrollBegin={this.props.onMomentumScrollBegin}
        />
      </SafeAreaView>
    )
  }
}