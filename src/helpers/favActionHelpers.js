import React from "react";
import { StyleSheet } from "react-native";
import { Button, Icon } from "@ui-kitten/components";

// Movie
export const saveMovie = async (id, dispatch) => {
  const action = { type: "SAVE_MOVIE", id: id };
  dispatch(action);
};

export const deleteMovie = async (id, dispatch) => {
  const action = { type: "DELETE_MOVIE", id: id };
  dispatch(action);
};

export const mapStateToProps = (state) => {
  return {
    favMovies: state.favMovieID,
  };
};

//Icons
const EyeIcon = (props) => (
  <Icon {...props} name="eye" pack="fontawesomefive" />
);

const EyeSlashIcon = (props) => (
  <Icon {...props} name="eye-slash" pack="fontawesomefive" />
);

export const displaySaveObject = (id, dispatch, favObjects) => {
  if (favObjects.findIndex((i) => i === id) !== -1) {
    // L'object est sauvegardé
    return (
      <Button
        style={styles.button}
        title="Retirer des favoris"
        onPress={() => deleteMovie(id, dispatch)}
        accessoryLeft={EyeSlashIcon}
      />
    );
  }
  // L'object n'est pas sauvegardé
  return (
    <Button
      style={styles.button}
      title="Ajouter aux favoris"
      onPress={() => saveMovie(id, dispatch)}
      accessoryLeft={EyeIcon}
    />
  );
};

const styles = StyleSheet.create({
  tinyLogo: {
    width: 64,
    height: 64,
  },
  button: {
    margin: 2,
  },
});
