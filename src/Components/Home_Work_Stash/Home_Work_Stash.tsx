import React, { FunctionComponent } from 'react';
import { View } from 'react-native';
import HomeWorkIcon from '../Home_Work_Icon/Home_Work_Icon';

const HomeWorkStash: FunctionComponent = () => {
    return (
        <View>
            <View
                style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    alignSelf: 'center',
                    marginTop: 40,
                    justifyContent: 'center',
                }}>
                <HomeWorkIcon
                    image_icon={require('../../../test/Images/Lesson_1.png')}
                    is_completed={true}
                />
            </View>
            <View
                style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    alignSelf: 'center',
                    marginTop: 20,
                    justifyContent: 'center',
                }}>
                <HomeWorkIcon
                    image_icon={require('../../../test/Images/Lesson_2.png')}
                    is_completed={true}
                    marginRight={10}
                />
                <HomeWorkIcon
                    image_icon={require('../../../test/Images/Lesson_3.png')}
                    is_completed={false}
                    marginLeft={10}
                />
            </View>
            <View
                style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    alignSelf: 'center',
                    marginTop: 20,
                    justifyContent: 'center',
                }}>
                <HomeWorkIcon
                    image_icon={require('../../../test/Images/Lesson_4.png')}
                    is_completed={false}
                    marginRight={10}
                />
                <HomeWorkIcon
                    image_icon={require('../../../test/Images/Lesson_5.png')}
                    is_completed={false}
                    marginLeft={10}
                    marginRight={10}
                />
                <HomeWorkIcon
                    image_icon={require('../../../test/Images/Lesson_6.png')}
                    is_completed={false}
                    marginLeft={10}
                />
            </View>
        </View>
    );
};

export default HomeWorkStash;
