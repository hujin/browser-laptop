/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

const React = require('react')
const {StyleSheet, css} = require('aphrodite/no-important')

// components
const ImmutableComponent = require('../../immutableComponent')
const BrowserButton = require('../../common/browserButton')

// style
const globalStyles = require('../../styles/global')

// other
const aboutActions = require('../../../../../js/about/aboutActions')

class LedgerBackupContent extends ImmutableComponent {
  copyToClipboard (text) {
    aboutActions.setClipboard(text)
  }

  render () {
    const passphrase = this.props.ledgerData.get('passphrase')

    return <section>
      <span data-l10n-id='ledgerBackupContent' />
      <div className={css(styles.ledgerBackupContent)}>
        <div className={css(
          styles.ledgerBackupContent__copyKey,
          styles.ledgerBackupContent__copyKey_second
        )}>
          <BrowserButton secondaryColor
            l10nId='copy'
            testId='copyButtonSecond'
            onClick={this.copyToClipboard.bind(this, passphrase)}
          />
          <div className={css(styles.ledgerBackupContent__copyKey__key)}>
            <span className={css(styles.ledgerBackupContent__copyKey__key__phrase)}>{passphrase}</span>
          </div>
        </div>
      </div>
    </section>
  }
}

class LedgerBackupFooter extends ImmutableComponent {
  constructor () {
    super()
    this.printKeys = this.printKeys.bind(this)
    this.saveKeys = this.saveKeys.bind(this)
  }

  generateKeyFile (backupAction) {
    aboutActions.ledgerGenerateKeyFile(backupAction)
  }

  printKeys () {
    this.generateKeyFile('print')
  }

  saveKeys () {
    this.generateKeyFile('save')
  }

  render () {
    return <section>
      <BrowserButton groupedItem primaryColor
        l10nId='printKeys'
        testId='printKeysButton'
        onClick={this.printKeys}
      />
      <BrowserButton groupedItem primaryColor
        l10nId='saveRecoveryFile'
        testId='saveRecoveryFileButton'
        onClick={this.saveKeys}
      />
      <BrowserButton groupedItem secondaryColor
        l10nId='done'
        testId='doneButton'
        onClick={this.props.hideOverlay.bind(this, 'ledgerBackup')}
      />
    </section>
  }
}

const styles = StyleSheet.create({
  ledgerBackupContent: {
    // Align the buttons and keys even when the width of the strings is not equal
    width: 'max-content',
    margin: 'auto',
    maxWidth: '100%'
  },

  ledgerBackupContent__copyKey: {
    display: 'flex',
    alignItems: 'center',
    margin: `${globalStyles.spacing.dialogInsideMargin} auto`
  },

  ledgerBackupContent__copyKey_second: {
    marginBottom: 0
  },

  ledgerBackupContent__copyKey__key: {
    marginLeft: `calc(${globalStyles.spacing.dialogInsideMargin} * 2)`
  },

  ledgerBackupContent__copyKey__key__header: {
    marginBottom: globalStyles.spacing.modalPanelHeaderMarginBottom
  },

  ledgerBackupContent__copyKey__key__phrase: {
    userSelect: 'initial',
    cursor: 'initial',
    color: '#D44600',
    font: '18px monospace'
  }
})

module.exports = {
  LedgerBackupContent,
  LedgerBackupFooter
}
