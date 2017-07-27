pipeline {
  agent any
      tools {
          maven 'Yadian-maven'
          jdk 'jdk8'
      }
  stages {
    stage('Message') {
      steps {
        parallel(
          "Message": {
            echo "PATH = ${PATH}"
            echo "M2_HOME = ${M2_HOME}"
          },
          "test": {
            echo 'This is another step'
          }
        )
      }
    }
    stage('Clean') {
      steps {
            echo 'This is another step'

      }
    }
    stage('Compile') {
      steps {
       echo 'This is another step'
      }
    }
    stage('Production') {
      steps {
       echo 'This is another step'
      }
    }
  }
}