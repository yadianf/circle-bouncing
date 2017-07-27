pipeline {
  agent {
    docker {
      image 'maven:3.3.9-jdk-8'
    }
    
  }
  stages {
    stage('Message') {
      steps {
        parallel(
          "Message": {
            echo 'hello world'
            echo 'ok'
            
          },
          "otro": {
            echo 'otro'
            
          }
        )
      }
    }
    stage('yea') {
      steps {
        echo 'yea'
      }
    }
  }
}