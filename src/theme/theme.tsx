import { StyleSheet } from "react-native";

export const THEME_COLOR = '#04B3FF';


export const appStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
      },
    formContainer: {
        flex: 1,
        paddingHorizontal: 30,
        justifyContent:'center',
        height: 600,
        marginBottom: 50
    },
    title: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 20
    },
    label: {
        marginTop: 25,
        color: 'white',
        fontWeight: 'bold',
    },
    inputField: {
        color:'white',
        fontSize: 12,
    },
    inputFieldIOS: {
        borderBottomColor: 'white',
        borderBottomWidth: 2,
        paddingBottom: 4
    },
    buttonContainer: {
        alignItems: 'center',
        marginTop: 50
    },
    button: {
        borderWidth: 2,
        borderColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 100
    },
    buttonText: {
        fontSize: 18,
        color: 'white'
    },
    newUserContainer: {
        alignItems: 'flex-end',
        marginTop: 10
    },
    buttonReturn: {
        position: 'absolute',
        top: 50,
        left: 20,
        borderWidth: 1,
        borderColor: 'white',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 100
    },
    rememberContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 30,
      },
      rememberText: {
        color: 'white',
        marginLeft: 10,
      },
      checkmark: {
        width: 20,
        height: 20,
        tintColor: 'white',
      },
      menuContainer: {
        marginVertical: 30,
        marginHorizontal: 50,
    },
    avatarContainer: {
        alignItems: 'center',
        marginTop: 20
    },
    avatar: {
        width: 150,
        height: 150,
        borderRadius: 100
    },
    menuBoton: {
        marginVertical: 10
    },
    avatarTexto: {
        fontSize: 9,
        color:THEME_COLOR,
        fontWeight: 'bold',
    },
    menuTexto: {
        fontSize: 16,
        color:THEME_COLOR,
        fontWeight: 'bold',
    },
    card: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor:THEME_COLOR,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        padding: 16,
        marginBottom: 16
      }, 
        list: {
    flex: 1,
    paddingTop: 16
  },
      name: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 4
      },
      description: {
        fontSize: 14,
        color: "#666",
        marginBottom: 4
      },
      amount: {
        flexDirection: "row",
        alignItems: "center"
      },
      blackButton: {
        height: 45,
        width: 200,
        backgroundColor: 'black',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowOpacity: 0.27,
        elevation: 6
    }, 

    iconButton: {
     padding:10
      },
    
});

