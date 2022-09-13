import React from 'react';
import {View, FlatList, StyleSheet, Dimensions} from 'react-native';
import {useSelector} from 'react-redux';

// Components
import ContanctItem from '../ContanctItem/ContanctItem';

// Style
import {greyish} from '../../../assets/palette/pallete.json';

const ContanctsList = () => {
  const activeClients = useSelector(state => state.mainSlice.activeClients);

  const itemSeparatorComponent = () => <View style={styles.seperator} />;

  return (
    <View style={styles.listContainer}>
      <FlatList
        data={activeClients}
        keyExtractor={itemData => itemData.email}
        ItemSeparatorComponent={itemSeparatorComponent}
        renderItem={itemData => <ContanctItem contact={itemData.item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {},
  seperator: {
    width: Dimensions.get('window').width * 0.9,
    alignSelf: 'center',
    borderColor: greyish,
    borderBottomWidth: 1,
  },
});

export default ContanctsList;
