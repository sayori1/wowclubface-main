import React from "react";
import { useState, useRef, useEffect } from "react";
import {
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Animated,
  TextInput, ScrollView,
} from "react-native";
import { HeaderBackButton } from "@react-navigation/stack";
import { connect } from "react-redux";
import { saveUser } from "../store/actions";
import { registerGuest } from "../api";
import Button from "../components/Button";

const Questions = ({ navigation, reduxSaveUser }) => {
  const [questions, setQuestions] = useState([
    {
      title: "Какой ваш возрастной диапазон?",
      type: "select",
      answers: [
        { text: "Мне больше 50", active: false, category: 'Лоб' },
        { text: "Мне между 40 и 50", active: false, category: 'Глаза' },
        { text: "Меньше 40", active: false, category: 'Щеки' },
      ],
    },
    {
      title: "Каков ваш вес по отношению к вашему росту?",
      type: "select",
      answers: [
        { text: "Недостаточный вес ", active: false, category: 'Глаза' },
        { text: "Нормальный вес", active: false, category: 'Лоб' },
        { text: "Несколько лишних килограмов", active: false, category: 'Щеки' },
        { text: "20+ лишних килограм", active: false, category: 'Двойной подбородок' },
      ],
    },
    {
      title: "Какое одно из этих выражений лица типично для вас?",
      type: "select",
      answers: [
        { text: "Лоб постоянно двигается", active: false, category: 'Лоб' },
        { text: "Мои брови постоянно напряжены, я много хмурюсь", active: false, category: 'Глаза' },
        { text: "Я много смеюсь и улыбаюсь; У меня морщинки вокруг глаз", active: false, category: 'Рот' },
        { text: "Мои губы сжаты. Уголки моего рта опускаются", active: false, category: 'Рот' },
        { text: "Ни одно из этих выражений не применимо", active: false },
      ],
    },
    {
      title: "Если бы вы могли улучшить одну область своего лица, что бы это было?",
      type: "check",
      answers: [
        { text: "Нижняя часть лица (зона декольте, шея, второй подбородок, тяжи, брыли, овал лица)", active: false, category: 'Щеки' },
        { text: "Морщины марионетки, кисетные морщинки на губах, опущение уголков губ, глубокие носогубные складки", active: false, category: 'Рот' },
        { text: "Глаза (синяки, отёчность, носослезная борозда, гусиные лапки, мешки под глазами, нависшие веки)", active: false, category: 'Глаза' },
        { text: "Верхняя часть лица (межбровье, нависшие веки, горизонтальные вертикальные морщины лба )", active: false, category: 'Лоб' },
      ],
    },
    {
      title: "Какие привычки из списка характерны для вас?",
      type: "check",
      answers: [
        { text: "Чаще держу телефон на одной (правой/левой) стороне", active: false, category: 'Щеки' },
        {
          text: "Я использую свой телефон для просмотра веб-страниц, отправляя текстовые сообщения более 20 раз в день",
          active: false, category: 'Глаза'
        },
        { text: "Я люблю опираться на руку, когда думаю/расслабляюсь", active: false, category: 'Щеки' },
        { text: "Чаще жую на левую/правую сторону", active: false, category: 'Рот' },
        { text: "Я использую компьютер/ноутбук каждый день по несколько часов", active: false, category: 'Глаза' },
        { text: "Мое любимое положение для сна на животе/без подушки ", active: false, category: 'Двойной подбородок' },
      ],
    },
    {
      subtitle: "Для занятий понадобится массажное масло для лица, вакуумные банки, скребок Гуаша, палочка Гуаша, перчатки. В приложении входит"
      +"\n1 Ручная пластика"
      +"\n2 Баночный массаж"
      +"\n3 Скребок Гуаша"
      +"\n4 Палочка Гуаша"
      +"\n5 Букальный массаж"
      ,
      type: "select",
      answers: [
        { text: "Ок", active: false },
      ],
    },
    {
      title: "Как вас зовут?",
      type: "input",
      placeholder: "Имя",
      value: "",
    },
  ]);

  const [index, setIndex] = useState(0);
  const [isSending, setSending] = useState(false);

  const setActive = (answerIndex) => {
    const copy = [...questions];

    const question = questions[index];

    const answer = question.answers[answerIndex];

    if (question.type === "check") {
      copy[index].answers[answerIndex].active = !answer.active;
    } else if (question.type === "select") {
      copy[index].answers.forEach((answer) => answer.active = false);

      copy[index].answers[answerIndex].active = true;
    }

    setQuestions(copy);
  };

  const setValue = (text, questionIndex) => {
    const copy = [...questions];

    const question = questions[questionIndex];

    question.value = text;

    setQuestions(copy);
  };

  const next = async () => {
    if (isSending) {
      return;
    }

    if (index + 1 >= questions.length) {
      setSending(true);
      try {
        const categories = {};

        for (const question of questions) {
          if (question.answers) {
            for (const answer of question.answers) {
              if (answer.category) {
                categories[answer.category] = answer.active?((categories[answer.category] || 0) + 1):(categories[answer.category] || 0)
              }
            }
          }
        }

        const res = await registerGuest(questions[questions.length - 1].value, categories);
        console.log(res);

        setSending(false);

        if (res.code === 200) {
          const user = res.body;

          reduxSaveUser({
            token: user.jwt,
            name: user.name,
          });

          return navigation.navigate("Generating");
        } else {
          console.log(res);
        }
      } catch (err) {
        console.log(err);
        setSending(false);
        return navigation.navigate("Error");
      }

      // return navigation.navigate('HomePages');
    } else {
      setProgress((index + 1) / questions.length * 100);
      setIndex(index + 1);
    }
  };

  const [progress, setProgress] = useState(0);
  const animation = useRef(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(animation.current, {
      toValue: progress,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  const width = animation.current.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
    extrapolate: "clamp",
  });

  return (
    <SafeAreaView
      style={{ ...styles.background, ...styles.flexContainer }}
    >
      <View style={{ height: 50, marginBottom: 10, marginLeft: 10 }}>
        <View style={styles.circleButton}>
          <HeaderBackButton
            onPress={() => {
              if (isSending) {
                return;
              }

              if (index < 1) {
                return navigation.navigate("Welcome");
              }

              setProgress((index - 1) / questions.length * 100);
              setIndex(index - 1);
            }}
          />
        </View>
      </View>

      <View style={{ ...styles.safeZone, ...styles.flexContainer }}>
        <View style={styles.progressBarWrapper}>
          <View style={styles.progressBar}>
            <Animated.View style={{ ...styles.absoluteFill, width }} />
          </View>
        </View>

        <Text style={styles.title}>{questions[index].title}</Text>
        
        <Text style={styles.subtitle}>{questions[index].subtitle}</Text>
        {/*<View style={styles.imageWrap}>*/}
        <ScrollView contentContainerStyle={styles.imageWrap}>
          {
            questions[index].type === "input" ? (
              <TextInput
                style={styles.input}
                maxLength={12}
                placeholder={questions[index].placeholder}
                value={questions[index].value}
                onChangeText={(text) => setValue(text, index)}
                placeholderTextColor="#000" />
            ) : (
              questions[index].answers.map((answer, answerIndex) => (
                <TouchableOpacity key={answerIndex} style={answer.active ? styles.selectActive : styles.selectWrapper}
                                  onPress={() => setActive(answerIndex)}>
                  <Text style={answer.active ? styles.selectActiveText : styles.selectText}>{answer.text}</Text>
                </TouchableOpacity>
              ))
            )
          }
        </ScrollView>
        <View style={styles.buttonWrapper}>
          <Button
            onPress={next}
            disabled={isSending || (questions[index].type === "input" && !questions[index].value.length) || (questions[index].type !== "input" && !questions[index].answers.some((answer) => answer.active))}
            text="Продолжить"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    reduxSaveUser: (userDetails) => dispatch(saveUser(userDetails)),
  };
};

export default connect(null, mapDispatchToProps)(Questions);

const styles = StyleSheet.create({
  circleButton: {
    height: 60,
    width: 60,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    height: 50,
    marginBottom: 10,
  },
  disabledButton: {
    width: "100%",
    borderRadius: 40,
    height: 55,
    backgroundColor: "#FEC55E7F",
    alignItems: "center",
    justifyContent: "center",
  },
  absoluteFill: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: "#f3a817", width: "14%",
    borderRadius: 5,
  },
  progressBarWrapper: {
    marginTop: 10,
    marginHorizontal: 30,
  },
  progressBar: {
    height: 5,
    width: "100%",
    backgroundColor: "#F0F3FB",
    borderColor: "#000",
    borderRadius: 5,
    marginBottom: 15,
  },
  flexContainer: {
    flex: 1,
  },
  input: {
    borderBottomColor: "#f3a817",
    borderBottomWidth: 2,
    textAlign: "center",
    color: "#000",
    fontFamily: "Inter-Regular",
    fontSize: 16,
    paddingHorizontal: 10,
    minWidth: 70,
  },
  background: {
    backgroundColor: "#FFF",
  },
  login: {
    textDecorationLine: "underline",
    fontFamily: "Inter-Bold",
    fontSize: 16,
    textAlign: "center",
    marginTop: 24,
  },
  imageWrap: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  Image: {
    flex: 1,
    width: 150,
  },
  safeZone: {
    marginHorizontal: 16,
    marginBottom: 24,
  },
  title: {
    textAlign: "center",
    fontFamily: "Inter-SemiBold",
    fontSize: 24,
    color: "#2E303F",
  },
  subtitle: {
    textAlign: "left",
    fontFamily: "Inter-SemiBold",
    fontSize: 18,
    color: "#2E303F",
  },
  header: {
    textAlign: "center",
    fontFamily: "Inter-Regular",
    color: "#2E303F",
    fontSize: 20,
    marginTop: 16,
    marginBottom: 12,
  },
  description: {
    fontFamily: "Inter-Regular",
    color: "#FFFFFF",
    fontSize: 15,
  },
  buttonWrapper: {
    justifyContent: "flex-end",
  },
  selectWrapper: {
    width: "100%",
    borderRadius: 20,
    borderColor: "#C0C0C2",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    borderWidth: 1,
  },
  selectText: {
    color: "#828282",
    textAlign: "center",
    fontFamily: "Inter-SemiBold",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  selectActive: {
    borderColor: "#f3a817",
    borderWidth: 1.5,
    width: "100%",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  selectActiveText: {
    fontFamily: "Inter-SemiBold",
    paddingHorizontal: 20,
    paddingVertical: 10,
    textAlign: "center",
    color: "#f3a817",
  },
  button: {
    width: "100%",
    borderRadius: 40,
    height: 55,
    backgroundColor: "#FEC55E",
    alignItems: "center",
    justifyContent: "center",
  },
  backgroundImage: {
    position: "absolute",
    right: 0,
    top: 10,
  },
  buttonText: {
    fontFamily: "Inter-Regular",
    color: "#FFFFFF",
    fontSize: 16,
  },
});

