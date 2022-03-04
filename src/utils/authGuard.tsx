import { store } from 'app/store';
import React, { ComponentType } from 'react';
import { Redirect } from 'react-router-dom';

export function WithAuth<T>(WrappedComponent: ComponentType<T>) {
	const EnhancedComponent = (props: T) => {
		const isLogged = store.getState().auth.isLogged;
		console.log(isLogged);

		if (isLogged === true) {
			return <Redirect to={'/'} />;
		} else {
			return <WrappedComponent {...props} />;
		}
	};

	return EnhancedComponent;
}
