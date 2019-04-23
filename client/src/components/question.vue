<template>
  <div>
    <v-card>
      <v-responsive :aspect-ratio="16/9" style="padding: 20px;">
        <v-card-text>
          <strong>Question {{ questionNumber }}:</strong><br>
          <strong>What song is this?</strong>
        </v-card-text>
        <br>
        <!-- <audio :src="question.audioUrl" controls></audio> -->
        <v-btn @click.prevent="playSound(question.audioUrl)" color="info">Play</v-btn>

        <div v-if="clicked">
          <div v-for="(answers, index) in question.answers" :key="index">
            <!-- <input
          type="radio"
          :id="'answer'+index"
          name="currentQuestion"
          v-model="answer"
          :value="answers"
        >
            <label :for="'answer'+index">{{answers}}</label>-->
            <v-btn large block
              :id="'answer'+index"
              :for="'answer'+index"
              name="currentQuestion"
              v-model="answer"
              :value="answers"
              @click="submitAnswer(answers)"
            >{{answers}}</v-btn>
            <!-- <v-radio-group v-model="answer" row>
          <v-radio :label="answers" :value="answers"></v-radio>
            </v-radio-group>-->
            <br>
          </div>
        </div>

        <!-- <v-btn color="info" @click="submitAnswer('answer')">Answer</v-btn> -->
      </v-responsive>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "question",
  data() {
    return {
      answer: "",
      clicked: false,
      audio: 0,
    };
  },
  props: ["question", "question-number"],
  methods: {
    submitAnswer: function(input) {
      this.$emit("answer", { answer: input });
      this.answer = null;
      this.clicked = false;
      this.audio.pause();
      this.audio.currentTime = 0;
    },
    playSound: function(sound) {
      if(sound) {
        this.audio = new Audio(sound);
        this.audio.play();
      }
      setTimeout(() => {
        this.clicked = true;
      }, 3000);
    },
  }
};
</script>