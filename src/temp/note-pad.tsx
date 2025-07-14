<Svg height="100" width="100">
        <Circle
          cx="50" // Center X coordinate
          cy="50" // Center Y coordinate
          r="40" // Radius
          fill="blue" // Fill color
        />
      </Svg>
      <Svg height="200" width="200">
        <Circle cx="100" cy="100" r="80" fill={'none'} stroke="purple" strokeWidth="4" />
      </Svg>

      <Svg height="200" width="200">
        <Defs>
          <LinearGradient id="grad" x1="0" y1="0" x2="100%" y2="100%">
            <Stop offset="0" stopColor="red" />
            <Stop offset="1" stopColor="blue" />
          </LinearGradient>
        </Defs>
        <Circle cx="100" cy="100" r="80" fill="url(#grad)" />
      </Svg>


      

         <KeyboardAvoidingView style={COMMON_STYLES.flex} behavior={_isIOS() ? 'padding' : 'height'}>
      <SafeAreaWrapper>
        <PrimaryHeader containerStyle={styles.headerStyle} />
        <View style={COMMON_STYLES.flex}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.contentContainerStyle}>
            <View>
              <Text style={styles.title}>
                Hello!{'\n'}Signup to {'\n'}get started
              </Text>
            </View>

            {/* form/formik */}
            {_renderFormik()}

            {/* or */}
            {_renderOrView()}

            {/* social buttons */}
            {_renderSocialButtons()}

            {/* sign in button */}
            {_renderSignInButton()}
          </ScrollView>
          {/* loader */}
          {/* <SecondaryLoader /> */}
        </View>
      </SafeAreaWrapper>
    </KeyboardAvoidingView>