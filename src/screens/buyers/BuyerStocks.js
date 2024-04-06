import {
    FlatList,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
    AssortedMetalCat,
    CardboardIcon,
    ClothIcon,
    ElectronicsIcon,
    GlassIcon,
    KartonCat,
    MetalIcon,
    MixedPaperCat,
    PlasticCatIcon,
    PlasticIcon,
    SelectedPaperCat,
    SolidMetalCat,
    WhitePaperCat
} from '../../components/Icons';

// Stocks Sample Data

const stocks = require('../../data/scraps.json');

const renderItem = ({ item }) => {
    return (
        <View style={styles.scraps__table_right_value_container}>
            <Text style={styles.scraps__table_right_column_value}>
                {item.scrapSizeVolume}
            </Text>
        </View>
    );
};

export default function BuyerStocks() {
    return (
        <SafeAreaView>
            <View style={styles.top_bar__container}>
                <Text style={styles.top_bar__container_header}>
                    Available Stocks
                </Text>
            </View>
            <ScrollView>
                <LinearGradient
                    colors={['#F2F2F2', '#3E5A47']}
                    start={{ x: 0, y: 0.5 }}
                    end={{ x: 0, y: 0.9 }}
                    style={{ height: '100%', padding: 35, marginBottom: 115 }}>
                    <View style={styles.scraps__table}>
                        <View style={styles.scraps__table_left_column}>
                            <Text style={styles.scraps__table_index}>
                                Types
                            </Text>
                            <View style={styles.scrapStock__icons}>
                                <PlasticCatIcon color={'#3E5A47'} />
                                <Text style={styles.scraps__table_scrap_header}>
                                    Plastic
                                </Text>
                            </View>
                            <View style={styles.scrapStock__icons}>
                                <WhitePaperCat color={'#3E5A47'} />
                                <Text style={styles.scraps__table_scrap_header}>
                                    White Paper
                                </Text>
                            </View>
                            <View style={styles.scrapStock__icons}>
                                <SelectedPaperCat color={'#3E5A47'} />
                                <Text style={styles.scraps__table_scrap_header}>
                                    Selected Paper
                                </Text>
                            </View>
                            <View style={styles.scrapStock__icons}>
                                <KartonCat color={'#3E5A47'} />
                                <Text style={styles.scraps__table_scrap_header}>
                                    Karton Paper
                                </Text>
                            </View>
                            <View style={styles.scrapStock__icons}>
                                <MixedPaperCat color={'#3E5A47'} />
                                <Text style={styles.scraps__table_scrap_header}>
                                    Mixed Paper
                                </Text>
                            </View>
                            <View style={styles.scrapStock__icons}>
                                <SolidMetalCat color={'#3E5A47'} />
                                <Text style={styles.scraps__table_scrap_header}>
                                    Solid Metal
                                </Text>
                            </View>
                            <View style={styles.scrapStock__icons}>
                                <AssortedMetalCat color={'#3E5A47'} />
                                <Text style={styles.scraps__table_scrap_header}>
                                    Assorted Metal
                                </Text>
                            </View>
                        </View>
                        <View style={styles.scraps__table_right_column}>
                            <Text
                                style={[
                                    styles.scraps__table_index,
                                    styles.scraps__table_index_right
                                ]}>
                                Total Weight (kg)
                            </Text>
                            <FlatList
                                data={stocks} // find a way to filter this data first before rendering. (FINAL HINT)
                                renderItem={renderItem}
                                scrollEnabled={false}
                                keyExtractor={item =>
                                    item.scrapID.toString()
                                }></FlatList>
                        </View>
                    </View>
                </LinearGradient>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    top_bar__container: {
        backgroundColor: '#3E5A47',
        height: 115,
        justifyContent: 'center',
        paddingTop: 25,
        paddingLeft: 20,
        paddingRight: 20
    },
    top_bar__container_header: {
        alignSelf: 'center',
        color: '#FFFFFF',
        fontFamily: 'Inter-Bold',
        fontSize: 26
    },
    scraps__table: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#3E5A47',
        borderRadius: 7
    },
    scraps__table_left_column: {
        flexDirection: 'column',
        alignItems: 'center',
        flex: 1
    },
    scraps__table_right_column: {
        alignItems: 'center',
        backgroundColor: '#3E5A47',
        borderTopRightRadius: 7,
        borderBottomRightRadius: 7,
        flexDirection: 'column',
        flex: 1.5
    },
    scraps__table_index: {
        color: '#3E5A47',
        fontFamily: 'Inter-Medium',
        fontSize: 12,
        marginTop: 15,
        marginBottom: 40
    },
    scraps__table_index_right: {
        color: '#F4F5F4'
    },
    scraps__table_scrap_header: {
        color: '#3E5A47',
        fontFamily: 'Inter-Bold',
        fontSize: 12,
        marginTop: 5,
        width: 65,
        textAlign: 'center'
    },
    scrapStock__icons: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: 50,
        marginBottom: 60
    },
    scraps__table_right_value_container: {
        justifyContent: 'center',
        flexDirection: 'row',
        height: 50,
        marginBottom: 60
    },
    scraps__table_right_column_value: {
        alignSelf: 'center',
        color: '#F4F5F4',
        fontFamily: 'Inter-SemiBold',
        fontSize: 32
    }
});
