import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { Theme } from '../../libs';

const Loader = ({ size = 50, color = Theme.colors.primary, inactiveColor = Theme.colors.black }) => {
    const animatedValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const startAnimation = () => {
            Animated.loop(
                Animated.timing(animatedValue, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                })
            ).start();
        };

        startAnimation();
    }, [animatedValue]);

    const createSegment = (index) => {
        // Create a wave effect where one segment is bright at a time
        const isActive = animatedValue.interpolate({
            inputRange: [0, 0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875, 1],
            outputRange: [
                index === 0 ? 1 : 0,
                index === 1 ? 1 : 0,
                index === 2 ? 1 : 0,
                index === 3 ? 1 : 0,
                index === 4 ? 1 : 0,
                index === 5 ? 1 : 0,
                index === 6 ? 1 : 0,
                index === 7 ? 1 : 0,
                index === 0 ? 1 : 0,
            ],
        });

        // Calculate position for each segment
        const angle = index * 45; // 45 degrees between each segment
        const radius = size * 0.35; // Distance from center

        const x = Math.cos((angle - 90) * Math.PI / 180) * radius;
        const y = Math.sin((angle - 90) * Math.PI / 180) * radius;

        return (
            <View key={index} style={{ position: 'absolute' }}>
                {/* Inactive segment */}
                <View
                    style={[
                        styles.segment,
                        {
                            width: size * 0.1,
                            height: size * 0.3,
                            borderRadius: size * 0.05,
                            backgroundColor: inactiveColor,
                            opacity: 0.3,
                            transform: [
                                { translateX: x },
                                { translateY: y },
                                { rotate: `${angle}deg` },
                            ],
                        },
                    ]}
                />
                {/* Active segment */}
                <Animated.View
                    style={[
                        styles.segment,
                        {
                            width: size * 0.1,
                            height: size * 0.3,
                            borderRadius: size * 0.05,
                            backgroundColor: color,
                            opacity: isActive,
                            transform: [
                                { translateX: x },
                                { translateY: y },
                                { rotate: `${angle}deg` },
                            ],
                        },
                    ]}
                />
            </View>
        );
    };

    return (
        <View style={[styles.container, { width: size, height: size }]}>
            {Array.from({ length: 8 }, (_, index) => createSegment(index))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    segment: {
        position: 'absolute',
        transformOrigin: 'center',
    },
});

export default Loader;