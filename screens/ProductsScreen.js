import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity, Modal, Image } from 'react-native';

const ProductsScreen = () => {
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [sortingOption, setSortingOption] = useState(null);

    useEffect(() => {
        setProducts(
            [
                {
                    id: 1,
                    title: 'Наушники Razer Barracuda X белый',
                    img: 'razer_barracuda_white.jpg',
                    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
                    category: 'headphones',
                    price: '5599'
                },
                {
                    id: 2,
                    title: 'Монитор AOC Q27G2S/EU черный',
                    img: 'aoc2_black.jpg',
                    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
                    category: 'screens',
                    price: '29899'
                },
                {
                    id: 3,
                    title: 'Клавиатура ARDOR Patron красная',
                    img: 'ardor_patron_red.jpg',
                    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
                    category: 'keyboards',
                    price: '6999'
                },
                {
                    id: 4,
                    title: 'ПК ZET GAMING WARD H285',
                    img: 'zet_ward.jpg',
                    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
                    category: 'pcs',
                    price: '86999'
                },
                {
                    id: 5,
                    title: 'Мышь беспроводная LAMZU Atlantis белый',
                    img: 'lamzu_atlantis_white.jpg',
                    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
                    category: 'mouses',
                    price: '5999'
                },
                {
                    id: 6,
                    title: 'Наушники A4Tech Bloody G575 желтый',
                    img: 'a4tech_bloody_yellow.jpg',
                    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
                    category: 'headphones',
                    price: '3199'
                },
                {
                    id: 7,
                    title: 'Клавиатура ARDOR Patron фиолетовая',
                    img: 'ardor_patron_purple.jpg',
                    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
                    category: 'keyboards',
                    price: '6999'
                }

            ]


        )
    }, []);

    const handleSearch = text => {
        setSearchQuery(text);
    };

    const handlePress = product => {
        setSelectedProduct(product);
        setModalVisible(true);
    };

    const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const sortProducts = () => {
        switch (sortingOption) {
            case 'expensive':
                return [...filteredProducts].sort((a, b) => b.price - a.price);
            case 'cheap':
                return [...filteredProducts].sort((a, b) => a.price - b.price);
            case 'category':
                return [...filteredProducts].sort((a, b) => a.category.localeCompare(b.category));
            default:
                return filteredProducts;
        }
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.item} onPress={() => handlePress(item)}>
            <Image style={styles.image} source={{ uri: item.image }} />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.price}>${item.price}</Text>

        </TouchableOpacity>
    );

    const closeModal = () => {
        setSelectedProduct(null);
        setModalVisible(false);
    };

    return (
        <View style={styles.container}>


            <TextInput
                style={styles.searchBar}
                onChangeText={handleSearch}
                value={searchQuery}
                placeholder="Search products..."
            />

            <View style={styles.sortingOptions}>
                <TouchableOpacity
                    style={[styles.sortingButton, sortingOption === 'expensive' && styles.activeButton]}
                    onPress={() => setSortingOption('expensive')}
                >
                    <Text style={styles.sortingButtonText}>Сначала дорогие | </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.sortingButton, sortingOption === 'cheap' && styles.activeButton]}
                    onPress={() => setSortingOption('cheap')}
                >
                    <Text style={styles.sortingButtonText}>Сначало дешевле | </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.sortingButton, sortingOption === 'category' && styles.activeButton]}
                    onPress={() => setSortingOption('category')}
                >
                    <Text style={styles.sortingButtonText}>По категориям</Text>
                </TouchableOpacity>
            </View>



            <FlatList
                data={sortProducts()}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
            />
            {selectedProduct && (
                <Modal animationType="slide" transparent={false} visible={modalVisible}>
                    <View style={styles.modalContainer}>
                        <Image style={styles.modalImage} source={{ uri: selectedProduct.image }} />
                        <Text style={styles.modalTitle}>{selectedProduct.title}</Text>
                        <Text style={styles.modalPrice}>${selectedProduct.price}</Text>
                        <Text style={styles.modalDescription}>{selectedProduct.description}</Text>
                        <View style={styles.sortingOptions}>

                            <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
                                <Text style={styles.modalButtonText}>Close</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalButton1} onPress={closeModal}>
                                <Text style={styles.modalButtonText}>Оплатить</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </Modal>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: 40
    },
    searchBar: {
        height: 40,
        width: 330,
        borderColor: '#000000',
        borderWidth: 1,
        borderRadius: 10,
        margin: 10,
        paddingLeft: 10,
    },
    item: {
        flex: 1,
        flexDirection: 'column',
        margin: 10,
        borderRadius: 10,
        width: 330,
        backgroundColor: '#ffffff',
        elevation: 3,
    },
    sortingOptions: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
        marginEnd: 10
    },
    title: {
        fontSize: 18,
        marginVertical: 10,
        marginHorizontal: 10,
    },
    price: {
        fontSize: 16,
        marginHorizontal: 10,
        marginBottom: 10,
        fontWeight: 'bold',
    },
    image: {
        height: 200,
        width: '100%',
        borderRadius: 10,
    },
    modalContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalImage: {
        height: 300,
        width: 300,
        borderRadius: 10,
    },
    modalTitle: {
        fontSize: 24,
        marginVertical: 10,
        fontWeight: 'bold',
    },
    modalPrice: {
        fontSize: 20,
        marginBottom: 10,
        fontWeight: 'bold',
    },
    modalDescription: {
        fontSize: 18,
        marginHorizontal: 20,
        marginVertical: 10,
    },
    modalButton: {
        marginEnd: 20,
        backgroundColor: '#1e90ff',
        padding: 10,
        borderRadius: 5,
        marginVertical: 10,
    },
    modalButton1: {

        backgroundColor: '#4bb34b',
        padding: 10,
        borderRadius: 5,
        marginVertical: 10,
    },
    modalButtonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default ProductsScreen;