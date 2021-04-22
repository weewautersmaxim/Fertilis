import React, { useCallback, useEffect, useState } from "react";
import { Text, TouchableOpacity, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Logo from "../../Components/Logo";
import { background } from "../../styles/colors/theme";
import { header } from "../../styles/components/header";
import { PlantCRUD } from "../../utils/PlantDb";
import { SQLResultSetRowList } from "expo-sqlite";
import Plant from "../../models/Plant";
import { useFocusEffect } from "@react-navigation/native";

const Plants = ({ navigation }: any) => {
  //useStates
  const [plantState, SetPlantState] = useState<Plant[]>([]);
  // useEffects
  useEffect(() => {
    getPlants();
    console.log("AAA", plantState);
  }, []);
  useEffect(() => {
    getPlants();
  }, [plantState]);

  //methods
  const getPlants = async () => {
    const { rows }: { rows: SQLResultSetRowList } = await PlantCRUD.read.all();
    await SetPlantState((rows as any)._array);
  };

  return (
    <SafeAreaView style={{ ...background.neutral.green, flex: 1 }}>
      {/* header */}
      <View style={header.headercontainer}>
        <TouchableOpacity
          style={{
            width: "33%",
            flexDirection: "row",
          }}
          onPress={() => navigation.navigate("TaskPage")}
        >
          <View style={header.imageContainer}>
            <Image
              style={header.backImage}
              source={require("../../assets/Back.png")}
            />
          </View>
          <Text style={header.backButton}>Back</Text>
        </TouchableOpacity>
        <View
          style={{
            width: "33%",
            alignItems: "center",
          }}
        >
          <Logo />
        </View>

        <TouchableOpacity
          style={{
            justifyContent: "flex-end",
            width: "33%",
            flexDirection: "row",
            alignItems: "center",
          }}
          onPress={() => {
            console.log("add");
          }}
        ></TouchableOpacity>
      </View>
      {/* end header */}
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <View
          style={{
            width: "85%",
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 20,
              marginTop: 20,
              marginBottom: 5,
              borderBottomColor: "white",
              borderBottomWidth: 1,
            }}
          >
            Plants:
          </Text>
        </View>
      </View>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <View
          style={{
            width: "85%",
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          {plantState.map((n: Plant) => (
            <TouchableOpacity key={n.id}>
              <View style={{ alignItems: "center" }}>
                <Text style={{ color: "white", fontSize: 20 }}>
                  {n.activity}
                </Text>
              </View>
              <View style={{ width: 60, height: 60 }}>
                <Image
                  style={{
                    resizeMode: "contain",
                    flex: 1,
                    width: "100%",
                    height: "100%",
                  }}
                  source={require("../../assets/DeleteLater.png")}
                />
              </View>
              <View style={{ alignItems: "center" }}>
                <Text style={{ color: "white", fontSize: 20 }}>30:00</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      {/* end section plants */}
      {/* start section achievments */}
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <View
          style={{
            width: "85%",
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 20,
              marginTop: 20,
              marginBottom: 5,
              borderBottomColor: "white",
              borderBottomWidth: 1,
            }}
          >
            Achievements:
          </Text>
        </View>
      </View>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <View
          style={{
            width: "85%",
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <TouchableOpacity>
            <View style={{ alignItems: "center" }}>
              <Text style={{ color: "white", fontSize: 20 }}>test</Text>
            </View>
            <View style={{ width: 60, height: 60 }}>
              <Image
                style={{
                  resizeMode: "contain",
                  flex: 1,
                  width: "100%",
                  height: "100%",
                }}
                source={require("../../assets/DeleteLater.png")}
              />
            </View>
            <View style={{ alignItems: "center" }}>
              <Text style={{ color: "white", fontSize: 20 }}>30:00</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={{ alignItems: "center" }}>
              <Text style={{ color: "white", fontSize: 20 }}>test</Text>
            </View>
            <View style={{ width: 60, height: 60 }}>
              <Image
                style={{
                  resizeMode: "contain",
                  flex: 1,
                  width: "100%",
                  height: "100%",
                }}
                source={require("../../assets/DeleteLater.png")}
              />
            </View>
            <View style={{ alignItems: "center" }}>
              <Text style={{ color: "white", fontSize: 20 }}>60:00</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={{ alignItems: "center" }}>
              <Text style={{ color: "white", fontSize: 20, opacity: 0.4 }}>
                test
              </Text>
            </View>
            <View style={{ width: 60, height: 60 }}>
              <Image
                style={{
                  resizeMode: "contain",
                  flex: 1,
                  width: "100%",
                  height: "100%",
                  opacity: 0.4,
                }}
                source={require("../../assets/DeleteLater.png")}
              />
            </View>
            <View style={{ alignItems: "center" }}>
              <Text style={{ color: "white", fontSize: 20, opacity: 0.4 }}>
                60:00
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={{ alignItems: "center" }}>
              <Text style={{ color: "white", fontSize: 20 }}>test</Text>
            </View>
            <View style={{ width: 60, height: 60 }}>
              <Image
                style={{
                  resizeMode: "contain",
                  flex: 1,
                  width: "100%",
                  height: "100%",
                }}
                source={require("../../assets/DeleteLater.png")}
              />
            </View>
            <View style={{ alignItems: "center" }}>
              <Text style={{ color: "white", fontSize: 20 }}>60:00</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default Plants;
