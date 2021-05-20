import * as React from 'react';

import * as Validator from '../../../../utils/validator';

class FormScreen extends React.Component {
    constructor(Model, key, props) {
        super(props);
        if (this.constructor == FormScreen) {
            throw new Error('Form is abstract class');
        }
        this.state = {
            model: this.isEdit() ? props.route.params.model : (Model ? new Model() : null),
            modalVisible: false,
            dialogText: ' '
        }
        this.key = key;
    }

    isEdit() {
        return this.props?.route?.params?.model;
    }

    setDialog(dialog) {
        this.setState(prevState => ({ ...prevState, dialogText: dialog }));
    }

    validateModel(key, text, options) {
        const { model } = this.state;
        const dialog = Validator.validateAndDialog(model[key], text, options);
        if (dialog)
            this.setDialog(dialog);
        return dialog == null;
    }

    handleChange(event, name, type) {
        Validator.setWithValidation(event, type, (text) => this.setState(prevState => (
            {
                ...prevState,
                model: {
                    ...prevState.model,
                    [name]: text
                }
            })
        ));
    }

    pushModel() {
        const { navigation, route } = this.props;
        navigation.navigate({
            name: 'FamilyAddMain',
            params: {
                model: this.state.model,
                key: this.key,
                index: this.isEdit() ? route.params.index : null
            },
            merge: true
        });
    }

    static title() {
        throw new Error('Not Implemented');
    }

    static expl() {
        throw new Error('Not Implemented');
    }

    formIsValid() {
        throw new Error('Not Implemented');
    }

    showModal() {
        this.setState(prevState => ({ ...prevState, modalVisible: true }))
        setTimeout(() => {
            this.setState(prevState => ({ ...prevState, modalVisible: false }))
        }, 2000);
    }

    onTick() {
        if (this.formIsValid())
            this.pushModel();
        else
            this.showModal();
    }

    setModalInvisible() {
        this.setState(prevState => ({ ...prevState, modalVisible: false }));
    }

    render() {
        throw new Error('Not Implemented');
    }
}

export default FormScreen;