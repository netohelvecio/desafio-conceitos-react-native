import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import api from './services/api';

export default function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories')
      .then(response => setRepositories(response.data))
      .catch(err => console.error(err));
  }, [])

  async function handleLikeRepository(id) {
    // Implement "Like Repository" functionality
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#26547c" />
      <SafeAreaView style={styles.container}>
        <FlatList
          data={repositories}
          keyExtractor={repository => repository.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.repositoryContainer}>
              <Text style={styles.repository}>{item.title}</Text>        
  
              <View style={styles.techsContainer}>
                {item.techs.map(tech => (
                  <Text key={tech} style={styles.tech}>
                    {tech}
                  </Text>
                ))}
              </View>
  
              <View style={styles.likesContainer}>
                <Text
                  style={styles.likeText}
                  // Remember to replace "1" below with repository ID: {`repository-likes-${repository.id}`}
                  testID={`repository-likes-1`}
                >
                  {item.likes} curtidas
                </Text>
              </View>
  
              <TouchableOpacity
                style={styles.buttonLike}
                activeOpacity={0.6}
                onPress={() => handleLikeRepository(1)}
                // Remember to replace "1" below with repository ID: {`like-button-${repository.id}`}
                testID={`like-button-1`}
              >
                <Text style={styles.buttonText}>Curtir</Text>
              </TouchableOpacity>
          </View>
          )}
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#26547c",
    padding: 20,
  },
  repositoryContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    marginTop: 15,
  },
  repository: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
  },
  techsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  tech: {
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 10,
    backgroundColor: "#06D6A0",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#fff",
    borderRadius: 8,
  },
  likesContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likeText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonLike: {
    marginTop: 10,
    borderRadius: 12,
    width: '100%',
    backgroundColor: '#26547c',
    paddingHorizontal: 18,
    paddingVertical: 12,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
});
