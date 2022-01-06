import React, { useEffect, useState } from "react";
import {
  Divider,
  Layout,
  List,
  Text,
  TopNavigation,
} from "@ui-kitten/components";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  ScrollView,
} from "react-native";
import { connect } from "react-redux";
import {
  displaySaveObject,
  mapStateToProps,
} from "../helpers/favActionHelpers";
import { getMovieCreditsByID } from "../api/TMDB";

const MovieDetails = ({ favMovies, dispatch, route }) => {
  const [credits, setCredits] = useState({});

  useEffect(() => {
    (async () => {
      let movieCredits = await getMovieCreditsByID({
        movie_id: route.params.movieDetails.id,
      });
      await setCredits(movieCredits.data.cast);
    })();
  }, [route]);

  const renderItem = ({ item }) => {
    return <Text>{item.name}</Text>;
  };

  const renderCredits = ({ item }) => {
    return (
      <Layout>
        <Text> {item.name} as {item.character} </Text>
     </Layout>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Layout style={{ margin: 5, flex: 1 }}>
          <Layout>
            <TopNavigation
              title={route.params.movieDetails.title}
              alignment="center"
            />
            
          </Layout>
          <Layout>
            <Layout>
              
              <Layout style={{ margin: 5 }}>
                {displaySaveObject(
                  route.params.movieDetails.id,
                  dispatch,
                  favMovies
                )}
              </Layout>
              <Layout style={{ margin: 5 }}>
                <Layout>
                  <Text category="h4">
                    Release : {route.params.movieDetails.release_date}
                  </Text>
                </Layout>

                <Layout>
                  <Text category="h4">
                    Genre
                    {route.params.movieDetails.genres.length >= 1 ? "s" : ""} :
                  </Text>
                  <Layout>
                    <View>
                      <List
                        data={route.params.movieDetails.genres}
                        renderItem={renderItem}
                      />
                    </View>
                  </Layout>
                </Layout>

                <Layout>
                  <Text category="h4">
                    Runtime :{route.params.movieDetails.runtime} min
                  </Text>
                </Layout>
                
                <Layout>
            <Text category="h4">Cast :</Text>
            <Layout>
              <View>
                <List
                  data={credits}
                  renderItem={renderCredits}
                  ItemSeparatorComponent={Divider}
                />
              </View>
            </Layout>
          </Layout>

              </Layout>
            </Layout>
          </Layout>

          <Layout>
                  <Text category="h4">Overview:</Text>
                  <Text>{route.params.movieDetails.overview}</Text>
                </Layout>





          
        </Layout>
      </ScrollView>
    </SafeAreaView>
  );
};

export default connect(mapStateToProps)(MovieDetails);

const styles = StyleSheet.create({
  informationContainer: {
    flex: 1,
    marginLeft: 0,
    justifyContent: "center",
  },
  container: {
    flexDirection: "row",
    paddingVertical: 8,
  },
  statsContainer: {
    flexDirection: "row",
    marginTop: 12,
  },
  statContainer: {
    flexDirection: "row",
    marginRight: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  data: {
    fontSize: 16,
  },
  cuisine: {
    fontStyle: "italic",
  },
  stat: {
    marginLeft: 4,
  },
  tinyLogo: {
    height: 128,
    width: 128,
  },
});
