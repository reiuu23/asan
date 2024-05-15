import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { ScrapContext } from '../../context/ScrapContext';
import { getWarehouseSummary } from '../../services/scrapdataService';
import {
  createStackNavigator,
  CardStyleInterpolators
} from '@react-navigation/stack';
import Login from '../../components/LoginForm';
import BuyerRegister from '../buyers/BuyerRegistration';
import OwnerRegister from '../owners/OwnerRegistration';
import OwnerNavigation from '../../router/OwnerNavigation';
import BuyerNavigation from '../../router/BuyerNavigation';
import CustomStackNavigator from '../../utils/CustomStackNavigator';
import useCustomFetch from '../../hooks/useCustomFetch';

export default function AuthUser({ navigation, route }) {
  // Session and Root

  const { userType } = route.params;
  const { data, fetchData } = useCustomFetch();
  const [session, setSession] = useState({
    token: null,
    userImage: null,
    userType: null,
    subPlan: null,
    selectedWarehouse: null,
  });

  const [dataSession, setDataSession] = useState(null);

  // Check if loadScrap turns to true

  const { data: scrapData = [], fetchData: loadScrap} = useCustomFetch();

  useEffect(() => {
    console.log('scrap data context (auth user): ', scrapData);
    console.log(
      'something happened, context changes? (auth user), re-check: ',
      scrapData
    );
  }, [scrapData])

  const fetchSummary = async (warehouseId, token) => {
    try {
      const response = await getWarehouseSummary(
        warehouseId,
        token
      );
      setDataSession(response);
    } catch (error) {
      console.log('Error: ', error);
    }
  };

  const sessionUpdate = async values => {
    const endpoint = userType === 'owner' ? 'owners' : 'buyers';
    const data =
      userType === 'owner'
        ? { owner_id: session.token }
        : { buyer_id: session.token };
    console.log(data);
    fetchData(`https://ls2tngnk9ytt.share.zrok.io/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer f7b5b129-7dd1-4366-bd1e-031e03315c32'
      },
      body: JSON.stringify(data)
    });
  };

  useEffect(() => {
    if(data) {
      console.log("new session data: ", data[0]);
      const { full_name, company, location, email, subPlan, subPlanStart, subPlanEnd, image } = data[0];
      setSession(prev => ({
        ...prev,
        profile: {
          fullName: full_name,
          company: company,
          location: location,
          email: email
        }
      }));
    }
  }, [data]);

  const options = {
    headerShown: false,
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
  };

  const authScreens = [
    {
      name: 'Login',
      component: Login,
      options
    },
    {
      name: 'Register',
      component: userType === 'owner' ? OwnerRegister : BuyerRegister,
      options
    }
  ];

  return (
    <>
      <AuthContext.Provider
        value={{ session, setSession, userType, sessionUpdate, dataSession, setDataSession, fetchSummary }}>
        {session.userType ? (
          session.userType === 'owner' ? (
            <ScrapContext.Provider value={{ scrapData, loadScrap }}>
              <OwnerNavigation></OwnerNavigation>
            </ScrapContext.Provider>
          ) : (
            <ScrapContext.Provider value={{ scrapData, loadScrap }}>
              <BuyerNavigation></BuyerNavigation>
            </ScrapContext.Provider>
          )
        ) : (
          <CustomStackNavigator screens={authScreens}></CustomStackNavigator>
        )}
      </AuthContext.Provider>
    </>
  );
}
