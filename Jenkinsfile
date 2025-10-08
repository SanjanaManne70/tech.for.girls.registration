pipeline {
    agent any

    environment {
        PYTHONIOENCODING = "utf-8"
    }

    stages {
        stage('Install Dependencies') {
            steps {
                sh '''
                python3 -m venv venv
                . venv/bin/activate
                pip install --upgrade pip
                pip install -r requirements.txt
                '''
            }
        }

        stage('Start Web Server') {
            steps {
                sh '''
                . venv/bin/activate
                python3 -m http.server 8000 > server.log 2>&1 &
                echo $! > server.pid
                sleep 3
                '''
            }
        }

        stage('Run Tests') {
            steps {
                sh '''
                . venv/bin/activate
                python3 tests/test_registration.py
                '''
            }
        }

        stage('Stop Web Server') {
            steps {
                sh '''
                kill $(cat server.pid)
                '''
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: '**/*.log', allowEmptyArchive: true
        }
    }
}
