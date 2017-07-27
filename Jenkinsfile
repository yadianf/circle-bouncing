pipeline {
  agent {
    docker {
      image 'maven:3.3.9-jdk8'
    }
    
  }
  stages {
    stage('error') {
      steps {
        sh 'mvn --version'
      }
    }
  }
}