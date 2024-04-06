import { View, Text, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView, StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { EllipseSelect } from '../../components/Icons';

const AuthOnboarding = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.wrapper}>
            <EllipseSelect style={{ position: 'absolute' }}></EllipseSelect>
            {/*  */}
            <View style={styles.authBtnContainer}>
                <Text style={styles.footerHeaderText}>Are you a?</Text>
                <TouchableOpacity
                    style={[styles.loginBtn, styles.btnShadow]}
                    onPress={() =>
                        navigation.navigate('Auth', { userType: 'owner' })
                    }>
                    <Text style={styles.loginBtnText}>Scrapyard Owner</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.signInBtn, styles.btnShadow]}
                    onPress={() =>
                        navigation.navigate('Auth', { userType: 'buyer' })
                    }>
                    <Text style={styles.signInBtnText}>Scrap Buyer</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: 'white',
        padding: 20
    },
    onboardingHeader: {
        color: '#46574C',
        flexWrap: 'wrap',
        fontFamily: 'Inter-Bold',
        fontSize: RFValue(25),
        marginTop: 10,
        width: 200,
        flex: 3
    },
    onboardingPic: {
        flex: 3,
        width: '100%',
        resizeMode: 'contain'
        // backgroundColor: 'green',
    },
    authBtnContainer: {
        flex: 5,
        justifyContent: 'flex-end'
        // backgroundColor: 'blue',
    },
    btnShadow: {
        elevation: 5
    },
    loginBtn: {
        alignItems: 'center',
        backgroundColor: '#EFEFEF',
        borderRadius: 8,
        padding: 15,
        marginBottom: 15
    },
    loginBtnText: {
        color: '#46574C',
        fontFamily: 'Inter-Bold',
        fontSize: RFValue(16)
    },
    signUpBtn: {
        alignItems: 'center',
        backgroundColor: '#5D7365',
        borderRadius: 8,
        padding: 15
    },
    signUpBtnText: {
        color: 'white',
        fontFamily: 'Inter-Bold',
        fontSize: RFValue(16)
    },
    signInBtn: {
        alignItems: 'center',
        backgroundColor: '#46574C',
        borderRadius: 8,
        padding: 15
    },
    signInBtnText: {
        color: 'white',
        fontFamily: 'Inter-Bold',
        fontSize: RFValue(16)
    },
    footerHeaderText: {
        alignSelf: 'center',
        color: 'darkgray',
        fontFamily: 'Inter-Bold',
        fontSize: RFValue(14),
        marginBottom: 20,
        marginTop: 20
    },
    helpBtnText: {
        fontFamily: 'Inter-Bold',
        textDecorationLine: 'underline',
        fontSize: RFValue(12)
    }
});

export default AuthOnboarding;
