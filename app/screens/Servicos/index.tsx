import React, { useEffect, useState } from "react";
import { View, Text, StatusBar, TouchableOpacity, ScrollView} from 'react-native';
import styles from "./styles";
import { Feather } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams, useNavigation } from "expo-router";

export default function Servicos() {
  const navigation = useNavigation();
  const { servico, barbeiro } = useLocalSearchParams();
  const [caixasAbertas, setCaixasAbertas] = useState<string[]>([]);

  useEffect(() => {
    if (servico && typeof servico === "string") {
      setCaixasAbertas(prev => [...new Set([...prev, servico])]);
    }
  }, [servico]);  

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  type Service = {
    name: string;
    price: string;
  };

  type AccordionBlockProps = {
    title: string;
    services: Service[];
    isOpen: boolean;
    onToggle: () => void;
    barbeiro: string | string[] | undefined;
  };

  const router = useRouter();

  const AccordionBlock: React.FC<AccordionBlockProps> = ({ title, services, isOpen, onToggle, barbeiro }) => {
    return (
      <View style={styles.containerBoxSelect}>
        <TouchableOpacity onPress={onToggle} style={styles.boxSelect}>
          <Text style={styles.boxTitle}>{title}</Text>
          <Feather
            name={isOpen ? "chevron-up" : "chevron-down"}
            size={20}
            color="#C9A64D"
          />
        </TouchableOpacity>

        {isOpen && (
          <View style={{ paddingHorizontal: 15, paddingBottom: 10 }}>
            {services.map((item, index) => (
              <View key={index} style={styles.serviceRow}>
                <View>
                  <Text style={styles.boxServiceTitle}>{item.name}</Text>
                  <Text style={styles.boxServicePrice}>{item.price}</Text>
                </View>

                <TouchableOpacity
                  style={styles.agendarButton}
                  onPress={() => router.push({
                    pathname: "./AgendarServico", // nome da página que você vai criar
                    params: {
                      service: item.name,
                      price: item.price,
                      category: title,
                      barbeiro: barbeiro || 'Qualquer'
                    }
                  })}
                >
                <Text style={styles.agendarButtonText}>Agendar</Text>
                </TouchableOpacity>

              </View>
            ))}
          </View>
        )}
      </View>
    );
  };

  return (

    <View style={styles.containerGeral}>
      <StatusBar
        backgroundColor="#18212A"
        barStyle="light-content"
      />

      <View>
        <TouchableOpacity onPress={() => router.back()} style={{ marginBottom: 20 }}>
          <Feather name="arrow-left" size={24} color="#C9A64D" />
        </TouchableOpacity>
      </View>
       
      <ScrollView>

        <Text style={styles.title}>Escolha o serviço desejado</Text>

        <AccordionBlock
          title="Cabelo"
          services={[
            { name: "Corte tradicional", price: "R$ 35,00" },
            { name: "Corte degradê", price: "R$ 40,00" },
            { name: "Corte máquina", price: "R$ 25,00" },
          ]}
          isOpen={caixasAbertas.includes("Cabelo")}
          onToggle={() =>
            setCaixasAbertas(prev =>
              prev.includes("Cabelo")
                ? prev.filter(caixa => caixa !== "Cabelo")
                : [...prev, "Cabelo"]
            )
          }
          barbeiro={barbeiro}
        />
      
        <AccordionBlock
          title="Barba"
          services={[
            { name: "Barba desenhada", price: "R$ 25,00" },
            { name: "Barba completa", price: "R$ 30,00" },
          ]}
          isOpen={caixasAbertas.includes("Barba")}
          onToggle={() =>
            setCaixasAbertas(prev =>
              prev.includes("Barba")
                ? prev.filter(caixa => caixa !== "Barba")
                : [...prev, "Barba"]
            )
          }
          barbeiro={barbeiro}
        />
      
        <AccordionBlock
          title="Sobrancelha"
          services={[
            { name: "Design com pinça", price: "R$ 15,00" },
            { name: "Design com navalha", price: "R$ 18,00" },
          ]}
          isOpen={caixasAbertas.includes("Sobrancelha")}
          onToggle={() =>
            setCaixasAbertas(prev =>
              prev.includes("Sobrancelha")
                ? prev.filter(caixa => caixa !== "Sobrancelha")
                : [...prev, "Sobrancelha"]
            )
          }
          barbeiro={barbeiro}
        />

      </ScrollView> 
    </View>
  );
}
