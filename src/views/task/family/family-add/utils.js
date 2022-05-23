import { Alert} from 'react-native';


export default function showAlert() {
    Alert.alert(
        'Uyarı',
        'Çıkmak İstediğinize Emin Misiniz?',
        [{
            text: 'İptal',
            style: 'cancel',
        },
        {
            text: 'Evet',
            style: 'ok',
            onPress: () => this.props.navigation.goBack() 
        }
        ],
        {cancelable: true}
    );
    return true;
}
