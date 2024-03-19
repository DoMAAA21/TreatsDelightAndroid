import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { categories as existingCategories } from '../../shared/inputs';


const CategoriesList = ({ onSelectCategory }) => {
    const [activeCategory, setActiveCategory] = useState(null);
    const newCategory = { value: 'Meals', label: 'Meals' };
    const categories = [newCategory, ...existingCategories]; //Prepend meal category

    const setCategory = (value) =>{
        setActiveCategory((prev) => (prev === value ? null : value));
        onSelectCategory(value); 
    }

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => setCategory(item.value)}>
            <View style={[
                styles.categoryContainer,
                activeCategory === item.value && styles.activeCategoryContainer
            ]}>
                <Text style={[
                    styles.categoryText,
                    activeCategory === item.value && styles.activeCategoryText
                ]}>{item.label}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Categories</Text>
            <FlatList
                data={categories}
                renderItem={renderItem}
                keyExtractor={(item) => item.value.toString()}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        paddingTop: 10,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    categoryContainer: {
        padding: 10,
        backgroundColor: 'white',
        marginBottom: 10,
        borderRadius: 6,
    },
    activeCategoryContainer: {
        backgroundColor: '#6B46C1',
    },
    categoryText: {
        fontSize: 16,
        marginBottom: 5,
        color: 'black',
    },
    activeCategoryText: {
        color: 'white'
    }
});

export default CategoriesList;
