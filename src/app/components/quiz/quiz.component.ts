import { Component, OnInit } from '@angular/core';
import quiz_questions from "../../../assets/data/quiz_questions.json"

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  
  title:string = ""
  questions:any
  question:any

  answers:string[] = []
  selectedAnswer:any

  questionIndex:number = 0
  questionMaxIndex:number = 0

  finished:boolean =  false

  constructor() { }

  remakeQuiz() {
    this.answers = [];
    this.questionIndex = 0;
    this.finished = false;

    this.question= this.questions[this.questionIndex];
    this.selectedAnswer = '';
  }

  ngOnInit(): void {
    if(quiz_questions){
      this.finished = false
      this.title = quiz_questions.title

      this.questions = quiz_questions.questions
      this.question = this.questions[this.questionIndex]

      this.questionIndex = 0
      this.questionMaxIndex = this.questions.length
    }
  }

  playerChoice(value:string){
    this.answers.push(value)
    this.nextStep()
  }

  async nextStep(){
    this.questionIndex += 1

    if(this.questionMaxIndex > this.questionIndex){
      this.question = this.questions[this.questionIndex]
    }else{
      const finalAnswer:string = await this.checkResult(this.answers)
      this.finished = true;

      const result = quiz_questions.results[0] as {
        [key: string]: {
          text: string;
          img: string;
        };
      };
      this.selectedAnswer = result[finalAnswer];
    }
  }

  async checkResult(answers: string[]) {
    const result = answers.reduce((previous, current, index, array) => {
      if (
        array.filter((item) => item === previous).length >
        array.filter((item) => item === current).length
      ) {
        return previous;
      } else {
        return current;
      }
    });

    return result
  }

}
