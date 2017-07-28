pipeline {
  agent any
  stages {
    stage('Staging') {
      steps {
        echo 'deploy in staging'
        node(label: 'Node') {
          echo 'hola'
          echo 'asdasdads'
        }
        
      }
    }
  }
  tools {
    maven 'Yadian-maven'
    jdk 'jdk8'
  }
}