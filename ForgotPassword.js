const ForgotPasswordScreen = ({ onResetPassword, onBackToLogin }) => {
    const [email, setEmail] = useState('');
  
    const handleResetPassword = () => {
      onResetPassword(email);
      Alert.alert("Password Reset", "If this email is registered, you will receive a password reset link.", [
        { text: "OK", onPress: onBackToLogin } // Navigate back to login after alert
      ]);
    };
  
    return (
      <View style={styles.container}>
        <Text style={styles.profileHeader}>Forgot Password</Text>
        <View style={styles.inputContainer}>
          <Image source={email_icon} style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <TouchableOpacity style={styles.submitButton} onPress={handleResetPassword}>
          <Text style={styles.submitButtonText}>Send Reset Link</Text>
        </TouchableOpacity>
      </View>
    );
  };
  