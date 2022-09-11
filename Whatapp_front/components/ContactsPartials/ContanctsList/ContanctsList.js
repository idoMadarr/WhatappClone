import React from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';

// Components
import ContanctItem from '../ContanctItem/ContanctItem';

const ContanctsList = () => {
  const activeClients = useSelector(state => state.mainSlice.activeClients);
  return (
    <View style={styles.listContainer}>
      <FlatList
        data={activeClients}
        keyExtractor={itemData => itemData.email}
        renderItem={itemData => <ContanctItem contact={itemData.item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {},
});

export default ContanctsList;
