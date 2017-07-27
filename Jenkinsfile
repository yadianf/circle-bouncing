pipeline {
  agent any
  stages {
    stage('Init') {
      steps {
        echo 'Init Build'
      }
    }
    stage('Installing Dependencies') {
      steps {
        sh '''npm install
bower install'''
      }
    }
    stage('Unit Test') {
      steps {
        sh 'gulp test'
      }
    }
    stage('Browser Test') {
      steps {
        parallel(
          "Browser Test": {
            echo 'To do : using browser stak'
            
          },
          "Chrome": {
            echo 'Todo: Browser stak'
            
          },
          "Edge": {
            echo 'Todo: Browser stak'
            
          },
          "Safari": {
            echo 'Todo: Browser stak'
            
          }
        )
      }
    }
    stage('Report') {
      steps {
        junit 'karma_html/*.xml'
      }
    }
    stage('Build') {
      steps {
        sh 'gulp build'
      }
    }
    stage('Staging') {
      steps {
        echo 'deploy in staging'
      }
    }
  }
  tools {
    maven 'Yadian-maven'
    jdk 'jdk8'
  }
}