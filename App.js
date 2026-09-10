import { StatusBar } from 'expo-status-bar';
import { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground, Vibration} from 'react-native';


const digiEgg = [
  {
    id:1, nome:"botamon" //koromon - agumon
  },
  {
    id:2, nome:"cocomon" //chocomon - lopmon
  },
  {
    id:3, nome:"zerimon" //terriermon
  },
  {
    id:4, nome:"punimon" //tunomon - gabumon
  },
  {
    id:5, nome:"Yukimibotamon" //nyaromon - salamon
  },
  {
    id:6, nome:"Pururumon" // poromon - hawkmon
  },
  {
    id:7, nome:"Chicomon" //chibimon - veemon
  }
];


export default function App() {
  const[ovoEscolhido, setOvoEscolhido] = useState(null);
  const [fome, setFome] = useState(50);
  const [felicidade, setFelicidade] = useState(50);
  const [mensagem, setMensagem] = useState('');
  const timerMensagem = useRef(null); // Ref para armazenar o ID do timer para as mensagens não sumirem antes do tempo!

  useEffect(() => {
    const relogio = setInterval(() => {
      setFome(fomeAtual => Math.max(fomeAtual - 1, 0));
      setFelicidade(felicidadeAtual => Math.max(felicidadeAtual - 1, 0));
    }, 1000);
    
    return () => clearInterval(relogio);
  }, []);


  return (

    <ImageBackground 
      source={require('./assets/bg3.jpg')}
      style={styles.container}
      resizeMode="cover"
    >
      <StatusBar style="auto" />


<View style={{ gap: 10, marginTop: 20 }}>
{digiEgg.map((eggAtual) => (
  <TouchableOpacity
    key = {eggAtual.id}
    style = {styles.botao}
    onPress={() => {
      setOvoEscolhido(eggAtual.nome);
    }}
  >
  <Text style={styles.textoBotao}>{eggAtual.nome}</Text>
  </TouchableOpacity>

))}
</View>

        <Text style={styles.titulo}>"oi alices"</Text>
        <Text style={styles.status}>Fome: {fome}</Text>
        <Text style={styles.status}>Felicidade: {felicidade}</Text>


    <Text style={{ fontSize: 20, color: 'blue', fontWeight: 'bold', height: 30 }}>
      {mensagem}
    </Text>

        <Image 
          source={require('./assets/nyaromon.png')}
          style={{ width: 200, height: 200, marginTop: 50 }}
        />

          <View style={styles.areaBotao}>
            <TouchableOpacity
              style={styles.botao}
              onPress={() => {
                setFome(Math.min(fome + 10, 100));
                setMensagem('nhac!');
                Vibration.vibrate(100);

                if (timerMensagem.current) {
                clearTimeout(timerMensagem.current);
              }

              timerMensagem.current = setTimeout(() => {
              setMensagem('');
              }, 2000);
                  
              }}
            >
              <Text style={styles.textoBotao}>Alimentar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.botao}
              onPress={() => {
                setFelicidade(Math.min(felicidade + 10, 100));
                setMensagem('yayyy!');
                Vibration.vibrate(100);

                if (timerMensagem.current) {
                clearTimeout(timerMensagem.current);
              }

              timerMensagem.current = setTimeout(() => {
              setMensagem('');
              }, 2000);
                  
              }}
            >
              
              <Text style={styles.textoBotao}>Brincar</Text>
            </TouchableOpacity>
          </View>

    </ImageBackground>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    
    
  },


  titulo:{
    fontSize:44,
    fontWeight:'bold',
    color: '#fefeff',
    fontFamily: 'Courier',
  },

    status:{
    fontSize:24,
    fontWeight:'bold',
    color: '#bfedff',
    fontFamily: 'Courier',
  },

  areaBotao:{
    flexDirection: 'row',  
    gap: 20,              
    marginTop: 40,
  },

    telaTamagotchi:{
    width: '65%',
    alignItems: 'center',
        borderWidth: 5,
            borderColor: '#422d4a',
    borderRadius: '100%',     
    backgroundColor: '#b480c5',             
    marginTop: 40,

  },
  botao:{
    backgroundColor: '#9a77ba',
    borderColor: '#ffffff',
    borderWidth: 3,
    padding: 15,                
    borderRadius: 25,           
    width: 130,              
    alignItems: 'center',
  },

    textoBotao:{
    color: '#fff',              
    fontWeight: 'bold',         
    fontSize: 16,
    
  }
});
