import * as React from 'react';

import Select from '../../components/select';

import * as LocationServices from '../../services/location-services';

import { connect } from 'react-redux';

function Location({ userReducer, loc, onValueChange }) {
    const [model, setModel] = React.useState({
        city: loc?.city,
        town: loc?.town,
        district: loc?.district,
        street: loc?.street
    });
    const [location, setLocation] = React.useState(
        {
            cities: LocationServices.getCities(),
            towns: null,
            districts: null,
            streets: null,
        }
    );

    React.useEffect(() => {
        getTowns(model.city);
    }, [])

    const sliceTowns = (towns) => {
        const slicedTowns = [];
        for (var town of towns)
            if (userReducer.user.towns.includes(town.value))
                slicedTowns.push(town);
        return slicedTowns;
    }


    const getTowns = (city) => {
        LocationServices.getTowns(city)
            .then(data => {
                const slicedData = sliceTowns(data);
                setLocation({ ...location, towns: slicedData, districts: null, streets: null });
            });
    }

    const getDistricts = (town) => {
        LocationServices.getDistricts(town)
            .then(data => {
                setLocation({ ...location, districts: data, streets: null });
            });
    }

    const getStreets = (district) => {
        LocationServices.getStreets(district)
            .then(data => {
                setLocation({ ...location, streets: data });
            });
    }

    const handleChange = (event, name) => {
        const newModel = { ...model, [name]: event }
        setModel(newModel);
        if (onValueChange)
            onValueChange(newModel);

        // if (event && name === 'city')
        //     getTowns(event);

        if (event && name === 'town')
            getDistricts(event);

        else if (event && name === 'district')
            getStreets(event);

    };

    return (
        <>
            <Select value={model.city} disabled={true} onValueChange={e => handleChange(e, 'city')} items={location.cities} style={styles.input} placeholder="İl" />
            {location.towns && <Select value={model.town} onValueChange={e => handleChange(e, 'town')} items={location.towns} style={styles.input} placeholder="İlçe" />}
            {location.districts && <Select value={model.district} onValueChange={e => handleChange(e, 'district')} items={location.districts} style={styles.input} placeholder="Mahalle" />}
            {location.streets && <Select value={model.street} onValueChange={e => handleChange(e, 'street')} items={location.streets} style={styles.input} placeholder="Sokak" />}
        </>
    );
}

const styles = {
    input: {
        marginTop: 10,
        marginHorizontal: 15,
    },
}

const mapStateToProps = (state) => ({
    userReducer: state.userReducer
});

export default connect(mapStateToProps)(Location);