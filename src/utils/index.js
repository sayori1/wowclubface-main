import { saveUser } from '../store/actions';

export const mapStateToProps = (state) => {
  return {
    userDetails: state.userReducer
  };
}

export const mapDispatchToProps = (dispatch) => {
  return {
    reduxSaveUser: (userDetails) => dispatch(saveUser(userDetails)),
  };
};

export const getGreeting = () => {
  const hour = new Date().getHours();

  if (hour < 12) {
    if (hour >= 6) {
      return 'Доброе утро';
    }

    return 'Доброй ночи';
  }

  if (hour >= 18) {
    return 'Добрый вечер';
  }

  return 'Добрый день';
}

export const getIcon = () => {
  const hour = new Date().getHours();

  if (hour < 12) {
    if (hour >= 6) {
      return 'sunrise';
    }

    return 'moon';
  }

  if (hour >= 18) {
    return 'sunset';
  }

  return 'sun';
}
