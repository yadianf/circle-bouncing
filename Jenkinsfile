pipeline {
  agent any
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
    stage('Production') {
      steps {
        echo 'success production'
      }
    }
  }
}