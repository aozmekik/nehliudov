import * as React from 'react';

import * as Validator from '../../../../utils/validator';

class FormScreen extends React.Component {
    constructor(Model, key, props) {
        super(props);
        if (this.constructor == FormScreen) {
            throw new Error('Form is abstract class');
        }
        this.state = {
            model: this.isEdit() ? props.route.params.model : new Model(),
            modalVisible: false
        }
        this.key = key;
    }

    isEdit() {
        return this.props?.route?.params?.model;
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
            name: 'Main',
            params: {
                model: this.state.model,
                title: this.getTitle(),
                expl: this.getExpl(),
                key: this.key,
                index: this.isEdit() ? route.params.index : null
            },
            merge: true
        });
    }

    getTitle() {
        throw new Error('Not Implemented');
    }

    getExpl() {
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